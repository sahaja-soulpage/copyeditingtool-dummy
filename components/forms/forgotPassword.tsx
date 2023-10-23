import React, { FC } from "react";
import { Form, Card, Image } from "react-bootstrap";
import { useFormik } from "formik";
import Link from "next/link";
import Button from "react-bootstrap-button-loader";
import { IForgetInputValues } from "lib/types";
import { ForgetPassValidation } from "lib/validation";
import { useRouter } from "next/router";
import { AuthorizationService } from "@/services";
import { toast } from "react-toastify";

interface IformikDefination {
  validateOnChange: boolean;
  validate?: any;
  handleSubmit: () => any;
  handleChange: (data: string) => any;
  values: IForgetInputValues;
  errors: any;
  resetForm: () => void;
}

const ForgetPasswordForm: FC = () => {
  const authService = new AuthorizationService();
  const [forgotPassword, setForgotPassword] = React.useState(true);
  const [emailsent, setEmailsent] = React.useState(false);
  const router = useRouter();

  const [sendingLink, setSendingLink] = React.useState(false);
  const [enable, setEnable] = React.useState(false);
  const formik: IformikDefination = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validate: ForgetPassValidation,
    onSubmit: () => {
      setSendingLink(true);
      const payload = { email: formik.values.email };
      authService
        .forgotPassword(payload)
        .then((res: any) => {
          toast.success(Object.entries(res)[0][1].toString());
          setSendingLink(false);
          setEnable(true);
          setForgotPassword(false);
          setEmailsent(true);
        })
        .catch((err) => {
          setSendingLink(false);
          toast.error(Object.entries(err)[0][1].toString() || "Something went wrong");
        });
    },
  });

  const handleUndoState = () => {
    setForgotPassword(true);
    setEmailsent(false);
    formik.values.email = "";
  };

  return (
    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
      {forgotPassword && (
        <>
          <Card className="password-container mt-3">
            <div className="d-flex h-100 flex-column align-items-center justify-content-center">
              <h3 className="signup-create-font mb-1">Forgot Password?</h3>
              <p className="pwd-text mb-0">No worries, we will send you reset instructions.</p>
              <div className="mt-3 mb-2">
                <Form.Group>
                  <Form.Label className="mb-0 email-font-style">Email</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    name="reset_email"
                    placeholder="name@company.com"
                    className="f-16 mb-0 input-style"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    isInvalid={formik.errors.email}
                    // style={{ width: "420px", height: "37px", color: "#626873" }}
                  />
                  {formik.errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      <div className="error-message">{formik.errors.email}</div>
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <Button
                loading={sendingLink}
                className="text-white f-16 mt-4 signup-button"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Reset password
              </Button>
            </div>
          </Card>
          <div className="d-flex mt-3 flex-row">
            <Image
              src="/icons/leftArrow.svg"
              className="cursor-pointer"
              alt="leftArrow"
              onClick={() => {
                router.push("/");
              }}
            ></Image>
            <Link href={`/`}>
              <p className="font-weight-bold forgot-text-i1 mb-0 ms-1 cursor-pointer">
                Back to log in
              </p>
            </Link>
          </div>
        </>
      )}

      <div>
        {enable === true && emailsent ? (
          <Card className="password-container mt-5">
            <div className="d-flex flex-column align-items-center justify-content-center mt-2">
              <span className="d-flex align-items-center justify-content-center cursor-pointer">
                <Image src="/email.svg"></Image>
              </span>
              <p className="d-flex align-items-center fw-bold f-16">Success!</p>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex flex-column">
                  <p className="m-0 f-13">We have sent you Password reset link to your</p>
                  <div className="d-flex flex-row justify-content-center text-center gap-2">
                    <p className="m-0 f-13 ">registered Email.</p>
                  </div>
                </div>
              </div>
              <Button className="mt-4 text-center basic-green-button" onClick={handleUndoState}>
                Okay
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};
export default ForgetPasswordForm;
