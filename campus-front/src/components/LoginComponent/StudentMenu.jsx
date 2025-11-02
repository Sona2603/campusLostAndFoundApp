import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBoxOpen, FaSignOutAlt, FaClipboardList, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const StudentMenu = () => {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f051aff, #1460e3ff)",
          padding: "20px 0",
        }}
      >
        <h1
          className="text-center fw-bold"
          style={{
            color: "white",
            textShadow: "2px 2px 6px rgba(43, 40, 40, 0.13)",
          }}
        >
          <i>Lost & Found - Student Menu</i>
        </h1>
      </div>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#574a3f38" }} className="shadow-sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Separate Items Menu Options */}
            <Nav.Link href="/LostItemsubmit" className="fw-bold">
              <FaClipboardList className="me-2 text-primary" />
              Lost Item Registration
            </Nav.Link>
            <Nav.Link href="/FoundItemSubmit" className="fw-bold">
              <FaBoxOpen className="me-2 text-success" />
              Found Item Submission
            </Nav.Link>
            <Nav.Link href="/studentlostReport" className="fw-bold">
              <FaSearch className="me-2 text-danger" />
              Lost Item Track
            </Nav.Link>
            <Nav.Link href="/studentfoundReport" className="fw-bold">
              <FaSearch className="me-2 text-warning" />
              Found Item Track
            </Nav.Link>
            <Nav.Link href="/fuzzySearch" className="fw-bold">
              <FaSearch className="me-2 text-info" />
              Lost Item Search
            </Nav.Link>
             <Nav.Link href="/ChatMessage" className="fw-bold">
              <FaMessage className="me-2 text-info" />
              Chat
            </Nav.Link>
          </Nav>
          
          {/* Right-aligned Profile and Logout */}
          <Nav className="ms-auto">
            {/* Profile Menu */}
            <NavDropdown
              title={
                <span>
                  <FaUserCircle className="me-2" /> <b>Profile</b>
                </span>
              }
              id="collasible-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item href="/personal">
                <FaUserCircle className="me-2 text-primary" />
                Personal Details
              </NavDropdown.Item>
              <NavDropdown.Item href="/studentlostReport">
                <FaSearch className="me-2 text-danger" />
                Lost Item List
              </NavDropdown.Item>
              <NavDropdown.Item href="/studentfoundReport">
                <FaSearch className="me-2 text-warning" />
                Found Item List
              </NavDropdown.Item>
            </NavDropdown>
            {/* Logout */}
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
          Welcome to the Lost & Found Portal 🎒📦
        </h3>
      </div>
    </div>
  );
};

export default StudentMenu;