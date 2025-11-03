import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fuzzySearching } from "../../Services/lostItemService";
import { FaSearch } from "react-icons/fa";

const FuzzySearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please enter a keyword to search.");
      setResults([]);
      return;
    }
    try {
      const response = await fuzzySearching(keyword);
      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
      console.error("Fuzzy search error:", err);
    }
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  return (
    <div
      className="py-5 d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #0044ff)",
        overflowY: "auto",
        alignItems: "flex-start",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ width: "75%", backgroundColor: "#ffffff" }}
      >
        {/* Header */}
        <div
          className="card-header text-center pt-3"
          style={{
            backgroundColor: "#001d3d",
            color: "white",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <div className="d-flex justify-content-center mb-3">
            <div
              className="rounded-circle shadow d-flex justify-content-center align-items-center"
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #000000, #1643c0ff)",
                color: "#fff",
              }}
            >
              <FaSearch size={35} />
            </div>
          </div>
          <h4 className="fw-bold mb-0">Fuzzy Search for Lost Items</h4>
          <p className="tagline">Find items that are similar to your search</p>
        </div>

        {/* Body */}
        <div className="card-body p-4" style={{ backgroundColor: "#fdfdfd" }}>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-pill me-2"
                placeholder="Enter keyword (e.g., 'blue water bottle')"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                Search
              </button>
            </div>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>

          {results.length > 0 && (
            <div className="mt-4">
              <h5 className="fw-bold mb-3">Search Results:</h5>
              <ul className="list-group">
                {results.map((item) => (
                  <li key={item.lostitemId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.itemName}</strong> - {item.category} ({item.color}, {item.brand})
                      <br />
                      <small>Lost on: {new Date(item.lostDate).toLocaleDateString()} at {item.location}</small>
                    </div>
                    <span className="badge bg-info rounded-pill">ID: {item.lostitemId}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={returnBack}
            >
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuzzySearch;