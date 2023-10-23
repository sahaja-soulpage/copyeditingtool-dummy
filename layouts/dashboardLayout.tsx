// react
import React from "react";

// hooks
// components
import { DashboardHeader } from "components/toolbars";

const DashboardLayout = ({ children }: any) => {
  return (
    <React.Fragment>
      <div>
        <DashboardHeader />
        <div className="navigation-link1"></div>
      </div>
      <div>
        <div className="main-wrapper">
          <>{children}</>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
