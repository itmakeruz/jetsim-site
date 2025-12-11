import { lazy, Suspense } from "react";
import { APP_ROUTES } from "./path";
import MainLayout from "../layouts/MainLayout/MainLayout";
import SimpleLayout from "../layouts/SimpleLayout/SimpleLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/AboutUs/About"));
const Confidential = lazy(() => import("../pages/Confidential/Confidential"));
const Oferta = lazy(() => import("../pages/Oferta/Oferta"));
const Rules = lazy(() => import("../pages/Rules/Rules"));
const Usloviya = lazy(() => import("../pages/Usloviya/Usloviya"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const How = lazy(() => import("../pages/HowWorks/How"));
const ProfileLayout = lazy(
  () => import("../layouts/ProfileLayout/ProfileLayout")
);
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));
const CartPage = lazy(() => import("../pages/Profile/CartPage"));
const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const ActivePage = lazy(() => import("../pages/Profile/ActivePage"));
const InactivePage = lazy(() => import("../pages/Profile/InactivePage"));
const HistoryPage = lazy(() => import("../pages/Profile/HistoryPage"));
const Tariffs = lazy(() => import("../pages/Tariffs/Tariffs"));
const Login = lazy(() => import("../pages/Login/Login"));
const Verification = lazy(() => import("../pages/Verification/Verification"));
const Error404 = lazy(() => import("../pages/404/Error404"));

export const appRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.ABOUT,
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.CONFIDENTIAL,
        element: (
          <Suspense fallback={<Loader />}>
            <Confidential />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.OFERTA,
        element: (
          <Suspense fallback={<Loader />}>
            <Oferta />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.RULE,
        element: (
          <Suspense fallback={<Loader />}>
            <Rules />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.USLOVIYA,
        element: (
          <Suspense fallback={<Loader />}>
            <Usloviya />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.FAQ,
        element: (
          <Suspense fallback={<Loader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.HOW_WORKS,
        element: (
          <Suspense fallback={<Loader />}>
            <How />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: APP_ROUTES.TARIFFS,
        element: (
          <Suspense fallback={<Loader />}>
            <Tariffs />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.PAYMENT,
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <ProfileLayout />,
    children: [
      {
        path: APP_ROUTES.PROFILE,
        element: (
          <Suspense fallback={<Loader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.CART,
        element: (
          <Suspense fallback={<Loader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.ACTIVE,
        element: (
          <Suspense fallback={<Loader />}>
            <ActivePage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.INACTIVE,
        element: (
          <Suspense fallback={<Loader />}>
            <InactivePage />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.HISTORY,
        element: (
          <Suspense fallback={<Loader />}>
            <HistoryPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: APP_ROUTES.LOGIN,
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.VERIFY,
        element: (
          <Suspense fallback={<Loader />}>
            <Verification />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
