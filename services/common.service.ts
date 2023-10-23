import axios from "axios";
// import Router from "next/router";
import APIService from "./api.service";
import {
  SIGN_IN,
  USER_DATA,
  FILE_UPLOAD,
  CARD_DATA,

  // USER_LIST,
} from "lib/endpoints";

class CommonService extends APIService {
  // UploadFile
  UploadFile(data: any): Promise<any> {
    console.log(FILE_UPLOAD, "FILE_UPLOAD");
    return this.MultipartPost(`${FILE_UPLOAD}`, data)
      .then((res) => {
        console.log(res, "resss");
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  // Table Data
  getTableData(): Promise<any> {
    return this.get(`${FILE_UPLOAD}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  // Card Data
  CardData(): Promise<any> {
    return this.get(`${CARD_DATA}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  // Summary report  Data
  // getFileSummaryReport(id: any): Promise<any> {
  //   return this.get(`${FILE_UPLOAD}${id}/`)
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((error: any) => {
  //       throw error.response.data;
  //     });
  // }
  // Summary report Table Data
  getSummaryReport(id: any): Promise<any> {
    return this.get(`${FILE_UPLOAD}${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  // delete File
  deleteFile(id: any): Promise<any> {
    return this.delete(`${FILE_UPLOAD}${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default CommonService;
