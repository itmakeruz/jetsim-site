import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./router/routes";
import { AutoScrollToTop } from "./components/scrollToTop";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/authStore";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token, getProfile, logout } = useAuthStore();
  useEffect(() => {
    if (token) {
      getProfile().catch(() => {
        logout();
      });
    }
  }, []);
  console.log("re render app");

  return (
    <BrowserRouter>
      <AutoScrollToTop />
      <CartProvider>
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
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
