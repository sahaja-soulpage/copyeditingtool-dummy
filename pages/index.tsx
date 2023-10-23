import React, { FC, useEffect } from "react";
import { LoginForm, SignUpForm } from "components/forms";
import { useRouter } from "next/router";

const IndexPage: FC = ({ mutateUserDetails, loginStatus }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (loginStatus === "loggedIn") {
      router.push("/dashboard");
    }
  }, [loginStatus, router]);
  return (
    <>
      <div className="main-container-i">
        <div className="">
          <div className="d-flex flex-fill">
            <>
              {!router.query.proof ? (
                <LoginForm mutateUserDetails={mutateUserDetails} />
              ) : (
                <SignUpForm {...{ mutateUserDetails, loginStatus }} />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
