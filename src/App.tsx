import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./router/routes";
import { AutoScrollToTop } from "./components/scrollToTop";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/authStore";
import "react-toastify/dist/ReactToastify.css";
import {
  activeSimsQuery,
  cartItemsQuery,
  inactiveSimsQuery,
} from "./hooks/queries";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Loader from "./components/Loader";
import { useTariffStore } from "./store/tariffStore";
import { getLocalStorageCart } from "./lib/utils";
import { useSimcardStore } from "./store/simcardStore";

function App() {
  const { i18n } = useTranslation();
  const { setSelectedTariffs } = useTariffStore();
  const { setInactiveSims, setActiveSims } = useSimcardStore();
  const { getProfile, logout, isAuthenticated, isLoading, setIsLoading } =
    useAuthStore();
  const {
    data,
    isLoading: isLoadingCart,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["cartItems", i18n.language],
    queryFn: () => cartItemsQuery(),
    enabled: isAuthenticated && !isLoading,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const {
    data: inactiveSims,
    isLoading: isLoadingInactiveSims,
    refetch: refetchInactiveSims,
  } = useQuery({
    queryKey: ["inactiveSims", i18n.language],
    queryFn: () => inactiveSimsQuery(),
    enabled: isAuthenticated && !isLoading,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const {
    data: activeSims,
    isLoading: isLoadingActiveSims,
    refetch: refetchActiveSims,
  } = useQuery({
    queryKey: ["activeSims", i18n.language],
    queryFn: () => activeSimsQuery(),
    enabled: isAuthenticated && !isLoading,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      getProfile()
        .then(() => {
          localStorage.removeItem("cartItems");
        })
        .catch(() => {
          logout();
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (data) {
      setSelectedTariffs(data?.data.items || []);
    } else {
      setSelectedTariffs(getLocalStorageCart());
    }
  }, [data]);

  useEffect(() => {
    if (inactiveSims) {
      setInactiveSims(inactiveSims?.data || []);
    }
  }, [inactiveSims]);
  useEffect(() => {
    if (activeSims) {
      setActiveSims(activeSims?.data || []);
    }
  }, [activeSims]);

  // Refetch when tab becomes visible (user comes back to the tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        isAuthenticated &&
        !isLoading
      ) {
        refetchCart();
        refetchInactiveSims();
        refetchActiveSims();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    isAuthenticated,
    isLoading,
    refetchCart,
    refetchInactiveSims,
    refetchActiveSims,
  ]);

  if (
    isLoading ||
    isLoadingCart ||
    isLoadingInactiveSims ||
    isLoadingActiveSims
  ) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <AutoScrollToTop />
      <ToastContainer />
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
