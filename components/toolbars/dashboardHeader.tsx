import React, { FC } from "react";

import { Navbar, Nav, Image } from "react-bootstrap";
import { HeaderMenu } from "components/menu";

import useLoginStatus from "lib/hooks/useLoginStatus";
// import useSWR from "lib/hooks/useLoginStatus";
import cookie from "js-cookie";

const DashboardHeader: FC = () => {
  const { user: profileData } = useLoginStatus();

  return (
    <>
      {profileData && cookie.get("accessToken") ? (
        <Navbar
          className="w-100 p-0 px-4 nav"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)" }}
        >
          <Navbar.Brand>
            <Image className="img-fluid ms-2 cursor-pointer" src={"/icons/logo.svg"} alt="logo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <div className="nav-dropdown mt-1">
              <HeaderMenu />
            </div>
          </Nav>
        </Navbar>
      ) : (
        <Navbar
          className="w-100 p-0 px-4 nav"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)" }}
        >
          <Navbar.Brand>
            <Image className="img-fluid ms-2 cursor-pointer" src={"/icons/logo.svg"} alt="logo" />
          </Navbar.Brand>
        </Navbar>
      )}
    </>
  );
};

export default DashboardHeader;
