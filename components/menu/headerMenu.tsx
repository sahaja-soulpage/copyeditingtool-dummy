import React, { FC } from "react";
import { Dropdown, Image } from "react-bootstrap";
import cookie from "js-cookie";
import { AuthorizationService } from "services";
// import useLoginStatus from "lib/hooks/useLoginStatus";
import { useRouter } from "next/router";
import Link from "next/link";
const authService = new AuthorizationService();

const HeaderMenu: FC = () => {
  // const { user, mutate } = useLoginStatus();
  const router = useRouter();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="bg-transparent border-0 float-right p-0" id="dropdown-basic">
          <img
            className="rounded-circle mt-2 ms-2"
            src={"/icons/newAvatar.svg"}
            width="32"
            height="32"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-2" style={{ left: "-105px" }}>
          <Dropdown.Item>
            <Link href={`/profile`}>
              <p className="d-flex align-items-center menu-item-text flex-row">
                <Image src="/icons/settings.svg" width={20} height={20} className="me-2" />
                Settings
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            // className="list-group-item menu-item"
            onClick={() => {
              authService.logout();
              router.push("/");
              // mutate();
            }}
          >
            <div
              className="df1 flex-row"
              onClick={() => {
                cookie.remove("Token");
                window.location.href = "/";
                return false;
              }}
            >
              {cookie.get("accessToken") ? (
                <p className="d-flex align-items-center menu-item-text flex-row mb-0">
                  <Image src="/icons/log-out.svg" width={20} height={20} className="me-2" />
                  Sign out
                </p>
              ) : (
                <p className="d-flex align-items-center menu-item-text flex-row mb-0">Sign in</p>
              )}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default HeaderMenu;
