import React, { FC } from "react";
import { DefaultSeo } from "next-seo";
import "styles/App.scss";
import { SiteLayout } from "layouts";
import useLoginStatus from "lib/hooks/useLoginStatus";
// import { useRouter } from "next/router";
// import Head from "next/head";

const MyApp: FC = (props: any) => {
  // const router = useRouter();
  const {
    user: profileData,
    loginStatus: loginStatus,
    mutate: mutateUserDetails,
    // isLoading: isLoading,
  } = useLoginStatus();
  const { pageProps, err }: any = props;
  const modifiedPageProps = {
    ...pageProps,
    loginStatus,
    profileData,
    mutateUserDetails,
    err,
  };
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (
  //       loginStatus === "loggedOut" &&
  //       router.pathname !== "/forgotpassword" &&
  //       router.pathname !== "/" &&
  //       !router.pathname.includes("/resetpassword/")
  //     ) {
  //       router.push("/");
  //     }
  //   }
  // }, [profileData, router.asPath, isLoading]);
  return (
    <React.Fragment>
      <SiteLayout>
        <DefaultSeo />
        <props.Component {...modifiedPageProps} />
      </SiteLayout>
    </React.Fragment>
  );
};

export default MyApp;
