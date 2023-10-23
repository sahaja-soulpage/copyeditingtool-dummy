import axios, { AxiosPromise } from "axios";
// import APIService from './api.service';
export const RECAPTCHA = "api/verify-site";
class CaptchaService {
  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: headers ? headers : {},
    });
  }
  // Recaptcha
  verifyRecaptcha(data: any): Promise<any> {
    return this.post(`${RECAPTCHA}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}
export default CaptchaService;
