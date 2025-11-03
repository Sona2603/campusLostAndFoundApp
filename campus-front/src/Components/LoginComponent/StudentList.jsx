import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudent } from "../../Services/LoginService";
import { Button, Spinner, Alert, Table } from "react-bootstrap";

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    getAllStudents()
      .then((response) => {
        console.log("Students data:", response.data); // Debug log
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError("Failed to fetch student list. Please try again.");
        setLoading(false);
      });
  };

  const handleRemove = (username) => {
    if (window.confirm(`Are you sure you want to remove student ${username}?`)) {
      deleteStudent(username)
        .then(() => {
          alert(`Student ${username} removed successfully`);
          // Refresh the list after deletion
          setStudents(students.filter(stu => stu.username !== username));
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
          alert("Failed to delete student. Please try again.");
        });
    }
  };

  const returnBack = () => {
    navigate('/AdminMenu');
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #0e0d12ff, #1704aaff)", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card-header text-center pt-3"
            style={{
              backgroundColor: "#09053eff",
              color: "white",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <h2 className="fw-bold mb-0">📚 Student List</h2>
            <p className="tagline mb-0">Campus Lost & Found Portal</p>
          </div>

          <div className="card-body p-4">
            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-muted mt-3">Loading student details...</p>
              </div>
            )}

            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            {!loading && !error && students.length === 0 && (
              <Alert variant="info" className="text-center">
                No students found in the system.
              </Alert>
            )}

            {!loading && !error && students.length > 0 && (
              <div className="table-responsive">
                <Table striped bordered hover className="shadow-sm text-center">
                  <thead style={{ backgroundColor: "#3d2b61ff", color: "white" }}>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Person Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu, index) => (
                      <tr key={stu.username || index}>
                        <td>{index + 1}</td>
                        <td>{stu.username}</td>
                        <td>{stu.personName}</td>
                        <td>{stu.email}</td>
                        <td>
                          <span className={`badge ${stu.role === 'Admin' ? 'bg-warning' : 'bg-info'}`}>
                            {stu.role}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemove(stu.username)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={returnBack}
              >
                ⬅ Back to Admin Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;