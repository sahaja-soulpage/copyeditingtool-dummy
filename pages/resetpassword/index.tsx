import React, { FC } from "react";
import { ResetPasswordForm } from "components/forms";

const ResetPassword: FC = () => {
  return (
    <>
      <div className="d-flex flex-column main-container-i me-0 ms-0 w-100">
        <div className="d-flex h-100">
          <div className="d-flex flex-fill w-100">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
