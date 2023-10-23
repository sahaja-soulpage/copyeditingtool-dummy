import React, { FC } from "react";
import { ForgetPasswordForm } from "components/forms";

const ForgotPassword: FC = () => {
  return (
    <>
      <div className="d-flex flex-column main-container-i me-0 ms-0 w-100">
        <div className="d-flex h-100">
          <div className="d-flex flex-fill w-100">
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
