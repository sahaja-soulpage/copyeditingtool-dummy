import React, { FC } from "react";
import { Form, Card } from "react-bootstrap";
import Button from "react-bootstrap-button-loader";
import Reaptcha from "reaptcha";
//for validations
import { useFormik } from "formik";
import { ILogininInputValues } from "lib/types";
import { LoginInValidation } from "lib/validation";
//next link
import Link from "next/link";
import { useRouter } from "next/router";

//styled eye icon
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
// services
import { AuthorizationService, CaptchaService } from "services";
import { toast } from "react-toastify";

toast.configure();

const authService = new AuthorizationService();

interface IformikDefination {
  validateOnChange: boolean;
  validate?: any;
  handleSubmit: () => any;
  handleChange: (data: string) => any;
  values: ILogininInputValues;
  errors: any;
  resetForm: () => void;
}
interface ILoginProps {
  mutateUserDetails: any;
}

const LoginForm: FC<ILoginProps> = ({ mutateUserDetails }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const formik: IformikDefination = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validate: LoginInValidation,
    onSubmit: async (values: any) => {
      setLoading(true);
      authService
        .userSignIN(values)
        .then((res: any) => {
          authService.authenticateUser(res?.token);
          router.push("/dashboard");
          mutateUserDetails();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(Object.entries(err)[0][1].toString() || "Something went wrong");
        });
    },
  });
  const [captchaVerified, setCaptchaVerified] = React.useState(false);
  const captchaService = new CaptchaService();
  const captchaVerify = (value) => {
    captchaService
      .verifyRecaptcha({
        captcha_response: value,
      })
      .then(() => {
        setCaptchaVerified(true);
      })
      .catch((err) => {
        setCaptchaVerified(false);
        throw err;
      });
  };

  return (
    <>
      <div className=" w-100 mt-5 align-items-center justify-content-center">
        <Card className="password-container login-container mt-4">
          <div className="d-flex h-100 flex-column align-items-center justify-content-center">
            <h3 className="signup-create-font mb-3">Login to your account</h3>

            <div className="mb-2 mt-2">
              <label className="email-font-style">Email</label>

              <Form.Group>
                <Form.Control
                  name="email"
                  placeholder="Email"
                  className="input-style mb-0"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  isInvalid={formik.errors.email}
                  // disabled={tokenData ? true : false}
                />
                {formik.errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    <div className="error-message">{formik.errors.email}</div>
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>
            <div className="mb-0 mt-2">
              <label className="email-font-style f-16">Password</label>

              <Form.Group>
                <Form.Control
                  autoComplete="off"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input-style f-16 mb-0 mr-0"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  isInvalid={formik.errors.password}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className={!formik.errors.password ? "icon" : "error-icon"}
                >
                  {showPassword ? (
                    <Eye width="20" height="20" className="tenanterror-icon" />
                  ) : (
                    <EyeSlash width="20" height="20" className="tenanterror-icon" />
                  )}
                </i>
                {formik.errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    <div className="error-message w-100" style={{ maxWidth: 320 }}>
                      {formik.errors.password}
                    </div>
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>

            <div className="mt-2 mb-3 d-flex ms-auto ">
              <Link href={`/forgotpassword`}>
                <p className="f-16 mb-0 forgot-font">Forgot password?</p>
              </Link>
            </div>

            <Reaptcha
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onVerify={captchaVerify}
              className=" mb-2 "
            />
            <div>
              <Button
                type="submit"
                loading={loading}
                id="login-button"
                className="signup-button f-20 mt-2"
                spinAlignment="right"
                disabled={!captchaVerified}
                onClick={() => {
                  console.log("hite");
                  formik.handleSubmit();
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default LoginForm;
