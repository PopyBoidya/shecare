import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../Error/ErrorPage";
import Home from "../Home/Home";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Loign from "../Log/loging/Login";
import RequestPads from "../Page/RequestPads/RequestPads";
import Learn from "../Page/Learn/Learn";
import Volunteer from "../Page/Volunteer/Volunteer";
import MainVolunteer from "../Page/VolunteerPage/MainVolunteer";
import PrivetRoutes from "./PrivetRoutes";
import Admin from "../Admin";
import AdminHome from "../Page/Admin/Home/AdminHome";
import List from "../Page/Admin/VolunteerList/List";
import AdminRegister from "../Page/Admin/AdminRegister/AdminRegister";
import Settings from "../Page/Admin/Settings/Settings";
import Forget from "../Log/Forget/Forget";
import Donation from "../Page/Donation/Donation";

// Define the wait function
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dynamically import the Root component
const Root = lazy(() => wait(3000).then(() => import("../Root")));

const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/request-pad",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RequestPads />
          </Suspense>
        ),
      },
      {
        path: "/learn",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Learn />
          </Suspense>
        ),
      },
      {
        path: "/apply-volunteer",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Volunteer />
          </Suspense>
        ),
      },

 {
    path: "/donation",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Donation />
      </Suspense>
    ),
  },
    ],
  },
  {
    path: "/volunteer",
    element: (
      <PrivetRoutes allowedRoles={["volunteer"]}>
        <Suspense fallback={<LoadingSpinner />}>
          <MainVolunteer />
        </Suspense>
      </PrivetRoutes>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Loign />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Forget />
      </Suspense>
    ),
  },
 
  {
    path: "/admin",
    element: (
      <PrivetRoutes allowedRoles={["admin"]}>
        <Suspense fallback={<LoadingSpinner />}>
          <Admin />
        </Suspense>
      </PrivetRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: (
          <PrivetRoutes allowedRoles={["admin"]}>
            <Suspense fallback={<LoadingSpinner />}>
              <AdminHome />
            </Suspense>
          </PrivetRoutes>
        ),
      },
      {
        path: "/admin/volunteers-list",
        element: (
          <PrivetRoutes allowedRoles={["admin"]}>
            <Suspense fallback={<LoadingSpinner />}>
              <List />
            </Suspense>
          </PrivetRoutes>
        ),
      },
      {
        path: "/admin/admin-register",
        element: (
          <PrivetRoutes allowedRoles={["admin"]}>
            <Suspense fallback={<LoadingSpinner />}>
              <AdminRegister />
            </Suspense>
          </PrivetRoutes>

        ),
      },
      {
        path: "/admin/settings",
        element: (
          <PrivetRoutes allowedRoles={["admin"]}>
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          </PrivetRoutes>
        ),
      },
    ]
  }

]);

export default Routers;
