import React, { FC } from "react";
import { Form, Card, Image } from "react-bootstrap";
import Button from "react-bootstrap-button-loader";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ResetPassValidation } from "lib/validation";
import { toast } from "react-toastify";
import { AuthorizationService } from "@/services";

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const authService = new AuthorizationService();

  const [enable, setEnable] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword(showConfirmPassword ? false : true);
  };

  const formik: any = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validateOnChange: false,
    validate: ResetPassValidation,
    onSubmit: async () => {
      const URLtoken = router.query.id;
      const payload = {
        token: URLtoken,
        new_password: formik.values.new_password,
        confirm_password: formik.values.confirm_password,
      };
      authService
        .updatePassword(payload)
        .then((res: any) => {
          toast.success(res.message);
          setEnable(true);
          router.push("/");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      // setLoading(true);
      // setEnable(true);
    },
  });

  return (
    <div className=" w-100 align-items-center justify-content-start">
      <Card className="password-container login-container mt-3">
        <div className="d-flex h-100 flex-column align-items-center justify-content-center">
          <h3 className=" mb-0 signup-create-font">Reset Password</h3>
          <div className="mt-2">
            <Form.Group>
              <Form.Label className="mb-0 email-font-style">New Password</Form.Label>
              <Form.Control
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                name="new_password"
                placeholder="New Password"
                className="f-14 input-style"
                value={formik.values.new_password}
                onChange={formik.handleChange("new_password")}
                isInvalid={formik.errors.new_password}
                // style={{ width: "420px", height: "40px", color: "#626873" }}
              />
              <i onClick={togglePasswordVisiblity}>
                {showPassword ? (
                  <Eye width="20" height="20" className="tenanterror-icon-fpwd" />
                ) : (
                  <EyeSlash width="20" height="20" className="tenanterror-icon-fpwd" />
                )}
              </i>

              {formik.errors.new_password ? (
                <Form.Control.Feedback type="invalid">
                  <div className="error-message">{formik.errors.new_password}</div>
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </div>
          <div className="">
            <Form.Group>
              <Form.Label className="mb-0 f-16 email-font-style">Confirm New Password</Form.Label>
              <Form.Control
                autoComplete="off"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirm New Password"
                className="f-14 input-style"
                value={formik.values.confirm_password}
                onChange={formik.handleChange("confirm_password")}
                isInvalid={formik.errors.confirm_password}
              />
              <i onClick={toggleConfirmPasswordVisiblity}>
                {showConfirmPassword ? (
                  <Eye width="20" height="20" className="tenanterror-icon-fpwd" />
                ) : (
                  <EyeSlash width="20" height="20" className="tenanterror-icon-fpwd" />
                )}
              </i>
              {formik.errors.confirm_password ? (
                <Form.Control.Feedback type="invalid">
                  <div className="error-message">{formik.errors.confirm_password}</div>
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </div>
          <Button
            className="mt-4 signup-button"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </Card>

      {enable === true ? (
        <div className="d-flex flex-row  align-items-center justify-content-center mt-5">
          <Image src="/successRight.svg" alt="successRight">
            {" "}
          </Image>
          <p className="mt-4 ms-2">
            <span>Your password reset is successfully completed.</span>
            <br></br>
            <div className="text-center">
              <span
                className="forgot-text-i1 font-weight-bold ms-1 mt-3"
                onClick={() => router.push("/")}
              >
                Sign in
              </span>
              <span> here</span>
            </div>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ResetPasswordForm;
