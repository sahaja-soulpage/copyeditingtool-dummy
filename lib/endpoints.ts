export const BACKEND_API = process.env.API_SERVER;
export const BACK_END_SERVER_URL = `${process.env.BACK_END_SERVER_URL}`;

export const SIGN_IN = `/api/login`;
export const SIGN_UP = `/api/register`;
export const FORGOT_PASSWORD = `/api/forgot-password`; //it will send link to mail
export const UPDATE_PASSWORD = `/api/forgot-password-confirm`; // it will update our new password
export const USER_DATA = `/api/users/me`;

// Images
export const UPLOAD_FILE = `/api/assets`;
export const CREATE_IMAGE = `/api/images`;
export const GET_IMAGE_DETAILS = (id: any) => `/api/images/${id}/`;
export const UPDATE_IMAGE = (id: any) => `/api/images/${id}/`;
export const DELETE_IMAGE = (id: any) => `/api/images/${id}/`;

// fileupload
export const FILE_UPLOAD = `${BACK_END_SERVER_URL}/api/classifier/`;
export const CARD_DATA = `${BACK_END_SERVER_URL}/api/files-count/`;
