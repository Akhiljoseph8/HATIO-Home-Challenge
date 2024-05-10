import React from "react";
import Navbar from "react-bootstrap/Navbar";
function Header({ status }) {
  return (
    <Navbar className="bg-body-tertiary d-flex justify-content-between">
      <Navbar.Brand className="ms-3 text-success " href="/">
        <i class="fa-solid fa-list"></i> TODO
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header;
