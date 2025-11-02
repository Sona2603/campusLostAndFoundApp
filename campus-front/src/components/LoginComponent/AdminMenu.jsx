import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  FaUserGraduate,
  FaBoxOpen,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0c083cff, #0b30a7ff)",
          padding: "20px 0",
        }}
      >
        <h1
          className="text-center fw-bold"
          style={{
            color: "white",
            textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
          }}
        >
          <i>Lost & Found - Admin Menu</i>
        </h1>
      </div>

      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#a6a5adff" }} className="shadow-sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left side menu */}
          <Nav className="me-auto">
            {/* Student Menu */}
            <NavDropdown
              title={
                <span>
                  <FaUserGraduate className="me-2 text-primary" /> <b>Student</b>
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/StudentList">
                <FaUserGraduate className="me-2 text-info" /> Student List
              </NavDropdown.Item>
            </NavDropdown>

            {/* Lost Item Menu */}
            <NavDropdown
              title={
                <span>
                  <FaClipboardList className="me-2 text-danger" /> <b>Lost Items</b>
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/LostItemsubmit">
                <FaClipboardList className="me-2 text-primary" /> Lost Item Registration
              </NavDropdown.Item>
              <NavDropdown.Item href="/LostItemReport">
                <FaClipboardList className="me-2 text-success" /> Lost Item List
              </NavDropdown.Item>
              <NavDropdown.Item href="">
                <FaClipboardList className="me-2 text-warning" /> Lost Item Track
              </NavDropdown.Item>
            </NavDropdown>

            {/* Found Item Menu */}
            <NavDropdown
              title={
                <span>
                  <FaBoxOpen className="me-2 text-success" /> <b>Found Items</b>
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/FoundItemSubmit">
                <FaBoxOpen className="me-2 text-info" /> Found Item Submission
              </NavDropdown.Item>
              <NavDropdown.Item href="/FoundItemReport">
                <FaBoxOpen className="me-2 text-warning" /> Found Item List
              </NavDropdown.Item>
            </NavDropdown>

            {/* Reports Menu */}
            <NavDropdown
              title={
                <span>
                  <FaChartBar className="me-2 text-dark" /> <b>Reports</b>
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="/FoundItemReport">
                <FaChartBar className="me-2 text-success" /> Found Item Report
              </NavDropdown.Item>
              <NavDropdown.Item href="/LostItemReport">
                <FaChartBar className="me-2 text-danger" /> Lost Item Report
              </NavDropdown.Item>
              <NavDropdown.Item href="">
                <FaChartBar className="me-2 text-warning" /> Lost Found Analysis
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right side - Logout */}
          <Nav className="ms-auto">
            <Nav.Link href="/" className="fw-bold text-danger">
              <FaSignOutAlt className="me-2" /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Background Section */}
      <div
        style={{
          height: "80vh",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <h3 className="text-muted fw-light">
          Welcome Admin 👨‍💼 — Manage Students, Items & Reports here.
        </h3>
      </div>
    </div>
  );
};

export default AdminMenu;
