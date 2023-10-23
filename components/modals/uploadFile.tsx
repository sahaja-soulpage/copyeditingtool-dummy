import React, { FC, useRef, useState } from "react";
import { Modal, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap-button-loader";

//for validations
import { useFormik, FormikHelpers } from "formik";

import { FileuploadValidation } from "lib/validation";
import { FolderDropzone } from "components/dropzone";
import { toast } from "react-toastify";
import { CommonService } from "services";
interface INewFileProps {
  newState: any;
  setNewState: any;
  getData: any;
}

const UploadFile: FC<INewFileProps> = (props) => {
  const uploadfiledata = new CommonService();
  const [loading, setLoading] = useState(false);
  const { newState, setNewState, getData } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  // ref
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearSelectedFile = () => {
    setSelectedFile(null);
    formik.setFieldValue("file_name", "");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formik: any = useFormik({
    initialValues: {
      file_name: "",
    },
    validateOnChange: false,
    validate: FileuploadValidation,

    onSubmit: async (values, { resetForm }: FormikHelpers<any>) => {
      if (!selectedFile) {
        toast.error("please select file");

        return;
      }

      // const formdata = new FormData();
      // formdata.append("name", formik.values.file_name);
      // formdata.append("file", selectedFile);

      const formdata = {
        name: formik.values.file_name,
        file: selectedFile,
      };
      setLoading(true);

      uploadfiledata
        .UploadFile(formdata)
        .then((res) => {
          console.log(res, "upload file");
          toast.success("details updated successfully");
          getData();
          setLoading(false);
          setNewState({ model: false });
          resetForm();
          setSelectedFile(null);
        })
        .catch((error) => {
          console.log(error);
          setNewState({ model: false });
          setLoading(false);

          toast.error("Something went wrong");
          resetForm();
          setSelectedFile(null);
        });
    },
  });

  // const getTableData = () => {
  //   uploadfiledata
  //     .getTableData()
  //     .then((data) => {
  //       console.log(data, "data");
  //       toast.success("details updated successfully");
  //       getTableData();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Something went wrong");
  //     });
  // };
  return (
    <div>
      <Modal backdrop="static" keyboard={false} show={newState?.model} size="lg">
        <Modal.Body>
          <div className="d-flex align-items-start mb-3">
            <div className="">
              <label className="email-font-style text-dark">File Name</label>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter File Name"
                  className="model-input mb-0"
                  value={formik.values.file_name}
                  onChange={formik.handleChange("file_name")}
                  isInvalid={formik.errors.file_name}
                />
                {formik.errors.file_name ? (
                  <Form.Control.Feedback type="invalid">
                    <div className="error-message">{formik.errors.file_name}</div>
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>
            <div className="d-flex ms-auto gap-3">
              <Image
                src="/icons/cross.svg"
                alt="create new project"
                className="me-2"
                onClick={() => {
                  setNewState({ ...newState, model: false });
                }}
              />
            </div>
          </div>

          <div className="block-background container ">
            <div className="form-group ">
              <div>
                <FolderDropzone
                  setSelectedFile={setSelectedFile}
                  maxNumberOfFiles={1}
                  acceptedFileExtention={[".zip"]}
                />

                <div className="d-flex align-items-center w-80">
                  {selectedFile && (
                    <div className="selected-file">
                      <p className="pt-3">
                        {" "}
                        <Image
                          src="/icons/ic_round-attachment.svg"
                          alt="create new project"
                          style={{ width: "20px", height: "20px" }}
                        />
                        {selectedFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2 dflex justify-content-center align-items-center">
          <button className="btn ms-3 bg-white" onClick={clearSelectedFile}>
            Clear
          </button>

          <Button
            variant="primary"
            type="button"
            style={{ opacity: 0.9, width: 117 }}
            className="text-white f-17 text-center new-file-button"
            // onClick={() => {
            //   setNewprocess({ ...newprocess, model: true });
            // }}
            loading={loading}
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadFile;
