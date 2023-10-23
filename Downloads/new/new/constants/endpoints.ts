export const AUTH_VERIFY = "/verify";
export const AUTH_LOGIN = "/login";
export const AUTH_FORGOT = "/forgot";
export const AUTH_RESET = "/reset";

export const UPLOAD_FILE_S3 = `/s3-upload`;
export const UPDATE_FILE_S3 = `/s3-update`;

export const GET_CUSTOM_FILES = (type: any, page: any, perPage: any, search: any, merge: any) =>
  `/${
    type === "Split" ? "splitFiles" : "files"
  }?page=${page}&perPage=${perPage}&search=${search}&merge=${merge}`;

export const GET_FILES = `/files`;
export const GET_FILE = (id: any) => `/files/${id}`;

export const GET_SPLIT_FILE = (id: any) => `/splitFiles/${id}`;
export const GET_SPLIT_FILES = `/splitFiles`;
export const MERGE_FILE = `/merge`;
export const CLEAR_TAGS = `/clear-tags`;
export const SEARCH_TAGS = `/tags-search`;

export const GET_USER_DATA = `/user-details`;
export const GET_USERS = (page: any, perPage: any, search: any, filter: any) =>
  `/users?page=${page}&perPage=${perPage}&search=${search}&filter=${filter}`;
export const UPDATE_USER = (id: any) => `/users/${id}`;

export const GET_SERVICE_PROVIDERS = (page: any, perPage: any, search: any, apex: any) =>
  `/serviceProviders?page=${page}&perPage=${perPage}&search=${search}&apex=${apex}`;
export const UPDATE_SERVICE_PROVIDER = (id: any) => `/serviceProviders/${id}`;

export const GET_CLIENTS = (page: any, perPage: any, search: any) =>
  `/clients?page=${page}&perPage=${perPage}&search=${search}`;
export const UPDATE_CLIENT = (id: any) => `/clients/${id}`;

export const CREATE_TAGS = () => `/tags`;
export const GET_TAG = (id: any) => `/tags/${id}`;

export const GET_TAXONOMIES = () => `/taxonomy`;
export const GET_TAXONOMY = (id: any) => `/taxonomy/${id}`;

export const GET_ELEMENT = (search: any) => `/elements?search=${search}`;
