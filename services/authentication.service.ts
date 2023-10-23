import axios from "axios";
// import Router from "next/router";
import APIService from "./api.service";
import {
  SIGN_IN,
  SIGN_UP,
  USER_DATA,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD,

  // USER_LIST,
} from "lib/endpoints";

class AuthorizationService extends APIService {
  getUsersData(): Promise<any> {
    return this.get(`${USER_DATA}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  // user sign in
  userSignIN(data: any): Promise<any> {
    return this.post(`${SIGN_IN}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  // new user
  createUser(data: any): Promise<any> {
    return this.post(`${SIGN_UP}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  //forgot-password (sends link to mail)
  forgotPassword(data: any): Promise<any> {
    return this.post(`${FORGOT_PASSWORD}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  updatePassword(data: any): Promise<any> {
    return this.post(`${UPDATE_PASSWORD}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  // updateUserDetails(data: any, userId: any): Promise<any> {
  //   return this.put(`${UPDATE_USER_DATA(userId)}`, data)
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((error: any) => {
  //       throw error.response.data;
  //     });
  // }
  // verify user
  authenticateUser(access: string): void {
    this.setAccessToken(access);
    // this.setRefreshToken(refresh);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
  }

  logout() {
    this.purgeAuth();
  }
}

export default AuthorizationService;
