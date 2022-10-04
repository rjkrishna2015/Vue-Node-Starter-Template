import tData from "./templateData";
export const templateData = tData;

export const PROJ_NAME = templateData.projName;

//! CONSOLE DEBUG CONTROL SECTION START !//
export const SHOW_CONSOLE_MSG = false;
//! CONSOLE DEBUG CONTROL SECTION END !//

//? API CALL PREFIX START ?//
export const API_PREFIX = "/api";
export const API_ROOT_PATH_LOCAL = `http://localhost:5000${API_PREFIX}`;
export const API_ROOT_PATH_PRODUCTION = "";

//* -----------------THIS IS BEING IS USED FOR AUTHENTICATION APIS------------ *//
export const AUTH_API = "/auth";
export const SIGIN_API = `${AUTH_API}/signin`;
export const SENDTEMPASSTOUSER = `${AUTH_API}/sendtempasstouser`;
export const CHCKPASSOFUSERANDINSERT = `${AUTH_API}/checkpasswordofuserandinsert`;
export const CHECKUSERNAMEINDBANDSENDOTP_API = `${AUTH_API}/checkusernameandsendotp`;
export const VERIFYOTP_API = `${AUTH_API}/verifyotp`;
export const CHANGEPASSWORD_API = `${AUTH_API}/changepassword`;
export const CHECKUSERWITHPASS_API = `${AUTH_API}/checkuserwithpass`;
//* -----------------THIS IS BEING IS USED FOR AUTHENTICATION APIS------------ *//

//* ----------- THIS IS BEING IS USED FOR SUPER ADMIN APIS ----------- *//
export const SUPERADMIN_API = "/superadmin";
export const GETSHOPKEEPERS_API = `${SUPERADMIN_API}/getshopkeepers`;
export const ADDSHOPKEEPER_API = `${SUPERADMIN_API}/addshopkeeper`;
export const EDITSHOPKEEPER_API = `${SUPERADMIN_API}/editshopkeeper`;
export const SHOPKEEPERPAYLIST_API = `${SUPERADMIN_API}/getshopkeeperpaylist`;
//* ----------- THIS IS BEING IS USED FOR SUPER ADMIN APIS ----------- *//

//? API CALL PREFIX END ?//
