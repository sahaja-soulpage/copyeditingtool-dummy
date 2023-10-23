// react
import React from "react";

// layouts - sidebar, header, main project component
import { DashboardLayout } from "layouts";

const SiteLayout = ({ children }: any) => {
  return <DashboardLayout {...{ children }} />;
};
export default SiteLayout;
