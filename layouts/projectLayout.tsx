// react
import React from "react";
// next router
import { useRouter } from "next/router";
// next seo
import { NextSeo } from "next-seo";
// react bootstrap
// import { ListGroup } from "react-bootstrap";

const ProjectLayout = ({ children }: any) => {
  const router = useRouter();
  const { project_id } = router.query;
  if (!project_id) {
    return (
      <main className="w-75 h-50 position-fixed">
        <NextSeo title={`${process.env.CLIENT_NAME} - Loading`} description="Loading" />
        {/* <PageLoading /> */}
      </main>
    );
  }

  return (
    <>
      <div className="d-flex flex-column h-100" id="top-page">
        <div className="px-4 mx-3">{children}</div>
      </div>
    </>
  );
};

export default ProjectLayout;
