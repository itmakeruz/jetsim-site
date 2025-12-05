import { lazy, Suspense } from "react";
import { APP_ROUTES } from "./path";
import MainLayout from "../layouts/MainLayout/MainLayout";
import SimpleLayout from "../layouts/SimpleLayout/SimpleLayout";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/AboutUs/About"));
const Confidential = lazy(() => import("../pages/Confidential/Confidential"));
const Oferta = lazy(() => import("../pages/Oferta/Oferta"));
const Rules = lazy(() => import("../pages/Rules/Rules"));
const Usloviya = lazy(() => import("../pages/Usloviya/Usloviya"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const How = lazy(() => import("../pages/HowWorks/How"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const SingleRegion = lazy(() => import("../pages/SIngleRegion/SingleRegion"));

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
      {
        path: APP_ROUTES.PROFILE,
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
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
        path: "/region/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SingleRegion />
          </Suspense>
        ),
      },
    ],
  },
];
