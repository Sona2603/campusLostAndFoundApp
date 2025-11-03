import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import "../../lost-item-report.css";
import { lostItemListByUser } from "../../Services/lostItemService";

const StudentLostItemReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    lostItemListByUser()
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch lost items. Please try again later.");
        console.error(err);
      });
  }, []);

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  const handleFoundSubmission = (item) => {
    navigate("/FoundItemSubmit", { state: { item } });
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="icon-circle">
          <FaClipboardList size={35} />
        </div>

        <h2 className="text-center">Lost Item List</h2>
        <p className="tagline">Campus Lost & Found Report</p>

        {error && <p className="error-text">{error}</p>}

        <div className="table-wrapper">
          <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Lost Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.lostDate}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleFoundSubmission(item)}
                    >
                      Found Submission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-actions">
          <button className="btn back-btn" onClick={returnBack}>
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLostItemReport;