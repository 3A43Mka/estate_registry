import Admin from "./pages/Admin";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE, LOGS_LIST_ROUTE,
  RECORDER_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USERS_LIST_ROUTE
} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Recorder from "./pages/Recorder";
import UsersList from "./pages/UsersList";
import LogsList from "./pages/LogsList";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: USERS_LIST_ROUTE,
    Component: UsersList
  },
  {
    path: LOGS_LIST_ROUTE,
    Component: LogsList
  },
];

export const recorderRoutes = [
  {
    path: RECORDER_ROUTE,
    Component: Recorder
  },

];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },

];