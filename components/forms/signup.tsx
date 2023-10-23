import React, { FC } from "react";
import { Form, Card } from "react-bootstrap";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap-button-loader";
import { useRouter } from "next/router";
// services
import { AuthorizationService } from "services";
// toast
import { toast } from "react-toastify";

const authService = new AuthorizationService();
// const inviteService = new InviteService();
interface SignUpProps {
  mutateUserDetails: (data: any) => void;
  loginStatus: string;
}

const SignUp: FC<SignUpProps> = ({ mutateUserDetails }: any) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword(showConfirmPassword ? false : true);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[^\w]/, "Password must contain at least 1 special character"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), "null"], "Confirm Password does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmit = async (values: any) => {
    const tenantsignuppayload: any = {
      email: values.email,
      password: values.password,
      role_id: 1,
    };
    const signinPayload: any = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    authService
      .createUser(tenantsignuppayload)
      .then(() => {
        authService
          .userSignIN(signinPayload)
          .then((res: any) => {
            authService.authenticateUser(res?.token);
            mutateUserDetails();
            router.push("/dashboard");
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err);
            setLoading(false);
          });

        // inviteService.collaborator({ proof_id: proofId, user_id: res.id });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err, { autoClose: 3000 });
        setLoading(false);
      });
  };

  return (
    <>
      <div className=" w-100 d-flex align-items-center justify-content-center">
        <Card className="password-container ">
          <div className="d-flex h-100 flex-column align-items-center justify-content-center">
            <h3 className="signup-create-font mb-3">Create your account</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="form-group mt-1 mb-3">
                <label className="email-font-style">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`form-control input-style ${errors?.email ? "is-invalid" : ""}`}
                />
              </div>

              <div className="form-group mt-2 mb-3">
                <label className="email-font-style">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="at least 8 characters"
                  {...register("password")}
                  className={`form-control input-style ${errors.password ? "is-invalid" : ""}`}
                  style={{ color: "#626873" }}
                />
                <i onClick={togglePasswordVisiblity}>
                  {showPassword ? (
                    <Eye width="20" height="20" className="tenanterror-icon" />
                  ) : (
                    <EyeSlash width="20" height="20" className="tenanterror-icon" />
                  )}
                </i>

                {errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    <div className="error-message">{errors.password?.message.toString()}</div>
                  </Form.Control.Feedback>
                ) : null}
              </div>

              <div className="form-group mt-2 mb-3">
                <label className="email-font-style f-16">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="re-enter password"
                  {...register("confirm_password")}
                  className={`form-control input-style ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                  style={{ color: "#626873" }}
                />
                <i onClick={toggleConfirmPasswordVisiblity}>
                  {showConfirmPassword ? (
                    <Eye width="20" height="20" className="tenanterror-icon" />
                  ) : (
                    <EyeSlash width="20" height="20" className="tenanterror-icon" />
                  )}
                </i>
                {errors.confirm_password ? (
                  <Form.Control.Feedback type="invalid">
                    <div className="error-message">
                      {errors.confirm_password?.message.toString()}
                    </div>
                  </Form.Control.Feedback>
                ) : null}
              </div>

              <div className="d-flex mt-4">
                <Button type="submit" loading={loading} className="signup-button f-0 mt-2">
                  Create account
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};
export default SignUp;
