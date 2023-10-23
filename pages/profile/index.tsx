import React, { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap-button-loader";
import useLoginStatus from "lib/hooks/useLoginStatus";

import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";

const UserProfile: FC = () => {
  const { user: profileData } = useLoginStatus();

  useEffect(() => {
    if (profileData) {
      setFieldValue("id", profileData.id);
      setFieldValue("firstname", profileData.name);
      setFieldValue("contact_number", profileData.phone_no);
      setFieldValue("email", profileData.email);
      setFieldValue("company", profileData.company);
      setFieldValue("avatar", profileData.profile_pic);
    }
  }, [profileData]);
  // const [profilePic, setProfilePic]: any = useState();
  const [loading, setLoading] = useState(false);

  const handleMobile = (tel: any) => {
    setFieldValue("contact_number", tel);
  };
  const handleEdit = () => {
    setFieldValue("isEditable", true);
    setShowIcon(true);
  };
  const handleSave = () => {
    setFieldValue("show", true);
  };
  const handleClose = () => {
    setFieldValue("show", false);
  };
  const hiddenFileInput = React.useRef(null) as any;

  const handleImageChange = (event: any) => {
    setFieldValue("avatar", event.target.files[0]);
    // setProfilePic(event.target.files[0]);
  };
  const [showIcon, setShowIcon] = React.useState(false);
  const { handleChange, handleSubmit, setFieldValue, values, resetForm } = useFormik({
    initialValues: {
      id: "",
      firstname: "",
      contact_number: "",
      email: "",
      company: profileData?.company && profileData?.company !== "null" ? profileData.company : "",
      avatar: "",
      isEditable: false,
      show: false,
    },

    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.firstname);
      formData.append("company", values.company);
      formData.append("phone_no", values.contact_number);
    },
  });
  const handleCancel = () => {
    setFieldValue("show", false);
    resetForm();
    setShowIcon(false);
    setFieldValue("isEditable", false);
  };
  const handleSubmission = () => {
    handleSubmit();
  };

  return (
    <div className="main-container-i1 ">
      <div className="container">
        <div className="py-5 mx-4 ">
          <form className="container" onSubmit={handleSubmit}>
            <h4 className="f-24 fw-700">Settings</h4>

            <p className="mb-0">Change your profile and account settings.</p>
            <div className="my-4 card  p-5">
              <div className="d-flex w-100 justify-content-between">
                <div>
                  {" "}
                  <h4>Avatar</h4>
                </div>
                <div className="ms-auto">
                  {!values.isEditable ? (
                    <button
                      className="btn new-file-button px-4 text-white "
                      type="button"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn new-file-button px-4 text-white "
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
              <img
                src={
                  values.avatar
                    ? typeof values.avatar == "string"
                      ? values.avatar
                      : URL.createObjectURL(values.avatar)
                    : "/icons/newAvatar.svg"
                }
                alt="User-picture"
                style={{ width: 70, height: 70 }}
                className="rounded-circle"
              />
              {showIcon === true && values.isEditable ? (
                <div className="overlay">
                  <img
                    onClick={() => {
                      // handleImageClick;
                      // values.isEditable ?
                      hiddenFileInput.current.click();
                      // : null;
                    }}
                    src="/icons/editIcon.svg"
                    alt="delete-icon"
                    style={{ marginTop: "-60px", color: "#6152D9", marginLeft: "54px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handleImageChange}
                    className="d-none"
                  />
                </div>
              ) : null}

              <hr></hr>
              <h4 className="pt-2">Profile</h4>
              <div className="row">
                <div className="col-md-6">
                  <p className="font-16 my-2 p-0 ">Full name</p>
                  <input
                    type="text"
                    name="firstname"
                    id=""
                    className="form-control  image-placeholder "
                    value={values.firstname}
                    placeholder="First name"
                    onChange={handleChange}
                    disabled={!values.isEditable}
                  />

                  <p className="font-16 my-2 mt-4 p-0 ">Contact number</p>
                  <PhoneInput
                    country={"us"}
                    // name="contact_number"
                    inputClass="form-control  image-placeholder w-100"
                    inputStyle={{
                      width: "100%",
                    }}
                    value={values.contact_number}
                    onChange={handleMobile}
                    disabled={!values.isEditable}
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div className="col-md-6">
                  <p className="font-16 my-2 p-0 ">Email</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="form-control  image-placeholder "
                    value={values.email}
                    onChange={handleChange}
                    disabled
                    readOnly
                  />

                  <p className="font-16 my-2 p-0 mt-4">Company</p>
                  <input
                    type="text"
                    name="company"
                    id="input1"
                    className="form-control  image-placeholder"
                    value={values.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    disabled={!values.isEditable}
                  />
                </div>
              </div>
            </div>
            <Modal
              onHide={handleClose}
              show={values.show}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header className="border-0 mt-4 ps-4 d-flex justify-content-center align-items-center">
                <Modal.Title className="mb-0">Confirm action</Modal.Title>
              </Modal.Header>
              <Modal.Body className="mb-0 mt-0 ps-4 pt-0 d-flex justify-content-center align-items-center">
                Do you want to save the changes?
              </Modal.Body>
              <Modal.Footer className="border-0 ms-2 mt-2 mb-2 d-flex justify-content-center align-items-center">
                <button className="btn ms-3 bg-white" onClick={handleCancel}>
                  Cancel
                </button>
                <Button
                  variant="primary"
                  className="text-white new-file-button"
                  onClick={handleSubmission}
                  style={{ width: 130 }}
                  loading={loading}
                >
                  Yes, save
                </Button>
              </Modal.Footer>
            </Modal>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
