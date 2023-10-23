import APIService from "./api.service";
import {
  CLEAR_TAGS,
  GET_CUSTOM_FILES,
  GET_FILE,
  GET_FILES,
  GET_SPLIT_FILE,
  GET_SPLIT_FILES,
  MERGE_FILE,
  SEARCH_TAGS,
  UPDATE_FILE_S3,
  UPLOAD_FILE_S3,
} from "@/constants/endpoints";

class FileService extends APIService {
  s3upload(data: any): Promise<any> {
    return this.postWithMultiPartHeaders(`${UPLOAD_FILE_S3}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  s3update(data: any): Promise<any> {
    return this.put(`${UPDATE_FILE_S3}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  getFiles(type: any, page: any, perPage: any, search: any, merge: any): Promise<any> {
    return this.get(`${GET_CUSTOM_FILES(type, page, perPage, search, merge)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  getFile(id: any): Promise<any> {
    return this.get(`${GET_FILE(id)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  // update file
  updateFile(id: any, data: any): Promise<any> {
    return this.put(`${GET_FILE(id)}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }
  // delete file
  deleteFile(id: any): Promise<any> {
    return this.delete(`${GET_FILE(id)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  // search context periods
  searchContext(fileId: any, splitFileId: any, search: any): Promise<any> {
    return this.get(`${GET_FILE(fileId)}/context?search=${search}&splitFileId=${splitFileId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  // create context periods
  createContext(id: any, data: any): Promise<any> {
    return this.post(`${GET_FILE(id)}/context`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  searchTags(data: any): Promise<any> {
    return this.post(`${SEARCH_TAGS}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  clearTags(data: any): Promise<any> {
    return this.post(`${CLEAR_TAGS}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  uploadFile(data: any): Promise<any> {
    return this.post(`${GET_FILES}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  splitFile(data: any): Promise<any> {
    return this.post(`${GET_SPLIT_FILES}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  mergeFile(data: any): Promise<any> {
    return this.post(`${MERGE_FILE}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  getSplitFile(id: any): Promise<any> {
    return this.get(`${GET_SPLIT_FILE(id)}`)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }

  // update file
  updateSplitFile(id: any, data: any): Promise<any> {
    return this.put(`${GET_SPLIT_FILE(id)}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
      });
  }
}

export default FileService;
