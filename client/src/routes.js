import Admin from "./pages/Admin";
import {
  ADD_ESTATE_ROUTE,
  ADD_ISSUER_ROUTE, ADD_RECORD_ROUTE, ADD_REQUEST_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE, LOGS_LIST_ROUTE, RECORD_ROUTE,
  RECORDER_ROUTE, REGISTER_NEW_USER_ROUTE, REQUEST_ROUTE, SEARCH_RECORDS_ROUTE, SEARCH_REQUESTS_ROUTE,
  SHOP_ROUTE,
  USERS_LIST_ROUTE
} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Recorder from "./pages/Recorder";
import UsersList from "./pages/UsersList";
import LogsList from "./pages/LogsList";
import RegisterNewUser from "./pages/RegisterNewUser";
import SearchRequests from "./pages/SearchRequests";
import SearchRecords from "./pages/SearchRecords";
import RequestPage from "./pages/requestPage";
import AddIssuer from "./pages/addIssuer";
import AddEstate from "./pages/addEstate";
import AddRequest from "./pages/addRequest";
import AddRecord from "./pages/addRecord";

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
  {
    path: REGISTER_NEW_USER_ROUTE,
    Component: RegisterNewUser
  },
];

export const recorderRoutes = [
  {
    path: RECORDER_ROUTE,
    Component: Recorder
  },
  {
    path: ADD_ISSUER_ROUTE,
    Component: AddIssuer
  },
  {
    path: ADD_ESTATE_ROUTE,
    Component: AddEstate
  },
  {
    path: ADD_REQUEST_ROUTE,
    Component: AddRequest
  },
  {
    path: ADD_RECORD_ROUTE,
    Component: AddRecord
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
    path: SEARCH_REQUESTS_ROUTE,
    Component: SearchRequests
  },
  {
    path: SEARCH_RECORDS_ROUTE,
    Component: SearchRecords
  },
  {
    path: REQUEST_ROUTE + "/:id",
    Component: RequestPage
  },
  {
    path: RECORD_ROUTE + "/:id",
    Component: RequestPage
  },
];