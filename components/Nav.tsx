import Link from "next/link";
import { Navbar, Image } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand={true}
      fixed="top"
      bg="white"
      variant="light"
      className="border p-0 px-sm-4"
    >
      <div className="container-fluid nav-container px-sm-5">
        <Link href="/">
          <Navbar.Brand className="p-0 cr-p">
            <Image alt="logo" id="logo" className="logo" src="/icons/logo.svg" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navbar-nav ms-auto">
            <a href="https://alphatics.ai/contact-us/" target="_blank" rel="noreferrer">
              <button type="button" className="btn text-white btn-primary">
                Contact Sales
              </button>
            </a>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
