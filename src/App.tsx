import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./router/routes";
import { AutoScrollToTop } from "./components/scrollToTop";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/authStore";
import "react-toastify/dist/ReactToastify.css";
import { cartItemsQuery } from "./hooks/queries";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Loader from "./components/Loader";
import { useTariffStore } from "./store/tariffStore";

function App() {
  const { i18n } = useTranslation();
  const { setSelectedTariffs } = useTariffStore();
  const { getProfile, logout, isAuthenticated, isLoading } = useAuthStore();
  const { data, isLoading: isLoadingCart } = useQuery({
    queryKey: ["cartItems", i18n.language],
    queryFn: () => cartItemsQuery(),
    enabled: isAuthenticated && !isLoading,
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
    }
  }, []);
  useEffect(() => {
    if (data) {
      setSelectedTariffs(data?.data.items || []);
    }
  }, [data]);
  if (isLoading || isLoadingCart) {
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
