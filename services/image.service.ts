import APIService from "./api.service";
import {
  UPLOAD_FILE,
  CREATE_IMAGE,
  GET_IMAGE_DETAILS,
  DELETE_IMAGE,
  UPDATE_IMAGE,
} from "lib/endpoints";

class ImageService extends APIService {
  uploadImage(data: any): Promise<any> {
    return this.MultipartPost(`${UPLOAD_FILE}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.message;
      });
  }

  createImage(data: any): Promise<any> {
    return this.post(`${CREATE_IMAGE}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  getImageDetails(id: any): Promise<any> {
    return this.get(`${GET_IMAGE_DETAILS(id)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  updateImage(id: any, data: any): Promise<any> {
    return this.put(`${UPDATE_IMAGE(id)}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  deleteImage(id: any): Promise<any> {
    return this.delete(`${DELETE_IMAGE(id)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default ImageService;
