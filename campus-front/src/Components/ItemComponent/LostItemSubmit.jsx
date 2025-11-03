import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { getUserDetails } from "../../Services/LoginService";
import { lostItemSubmission, lostItemIdGenerator } from '../../Services/lostItemService';
import { FaBoxOpen } from "react-icons/fa";

const LostItemSubmit = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState(0);
  const [campusUser, setCampusUser] = useState({
    username: "",
    password: "",
    personName: "",
    email: "",
    role: "",
  });
  const [item, setItem] = useState({
    lostitemId: "",
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
    lostDate: new Date(),
    status: false,
  });

  let [ldate, setLdate] = useState("");

  const setLostItemId = () => {
    lostItemIdGenerator().then(response => {
      setNewId(response.data);
    });
  };

  const setUserDetails = () => {
    getUserDetails().then(response => {
      setCampusUser(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUserDetails();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem(values => ({ ...values, [name]: value }));
  };

  const lostItemFormSubmit = (event) => {
    event.preventDefault();
    if (!handleValidation()) return;
    item.itemId = newId;
    item.username = campusUser.username;
    item.userEmail = campusUser.email;
    item.lostDate = ldate;
    lostItemSubmission(item).then(() => {
      alert("Lost Item Form Submitted Successfully!");
      navigate(campusUser.role === "Admin" ? '/AdminMenu' : '/StudentMenu');
    });
  };

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!item.itemName.trim()) {
      tempErrors.itemName = "Item Name is required";
      isValid = false;
    }
    if (!item.category.trim()) {
      tempErrors.category = "Category is required";
      isValid = false;
    }
    if (!item.color.trim()) {
      tempErrors.color = "Color is required";
      isValid = false;
    }
    if (!item.brand.trim()) {
      tempErrors.brand = "Brand is required";
      isValid = false;
    }
    if (!item.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    if (!ldate) {
      tempErrors.ldate = "Lost Date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const returnBack = () => {
    navigate(campusUser.role === "Admin" ? '/AdminMenu' : '/StudentMenu');
  };

  return (
    <div 
      style={{ 
        background: "linear-gradient(135deg, #000000, #0044ff)",
        minHeight: "100vh",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 0"
      }}
    >
      <div 
        className="card shadow-lg border-0 rounded-4 mb-5" 
        style={{ width: "70%", backgroundColor: "#ffffff" }}
      >
        {/* Header */}
        <div
          className="card-header text-center pt-3"
          style={{
            backgroundColor: "#001d3d",
            color: "white",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px"
          }}
        >
          <div className="d-flex justify-content-center mb-3">
            <div
              className="rounded-circle shadow d-flex justify-content-center align-items-center"
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #000000, #1643c0ff)",
                color: "#fff"
              }}
            >
              <FaBoxOpen size={35} />
            </div>
          </div>
          <h4 className="fw-bold mb-0">Lost Item Submission</h4>
          <p className="tagline">Campus Lost & Found Portal</p>
        </div>

        {/* Body */}
        <div className="card-body p-4" style={{ backgroundColor: "#fdfdfd" }}>
          <form onSubmit={lostItemFormSubmit}>
            {/* Item Id */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Item Id</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="itemId"
                  className="form-control form-control-sm rounded-pill"
                  value={newId}
                  readOnly
                />
              </div>
            </div>

            {/* Item Name */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Item Name</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="itemName"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Enter lost item name"
                  value={item.itemName}
                  onChange={onChangeHandler}
                />
                {errors.itemName && <p className="text-danger small">{errors.itemName}</p>}
              </div>
            </div>

            {/* Category */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Category</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="category"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Enter item category"
                  value={item.category}
                  onChange={onChangeHandler}
                />
                {errors.category && <p className="text-danger small">{errors.category}</p>}
              </div>
            </div>

            {/* Color */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Color</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="color"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Enter item color"
                  value={item.color}
                  onChange={onChangeHandler}
                />
                {errors.color && <p className="text-danger small">{errors.color}</p>}
              </div>
            </div>

            {/* Brand */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Brand</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="brand"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Enter brand name (if any)"
                  value={item.brand}
                  onChange={onChangeHandler}
                />
                {errors.brand && <p className="text-danger small">{errors.brand}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="row mb-3 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Lost Location</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="location"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Where did you lose it?"
                  value={item.location}
                  onChange={onChangeHandler}
                />
                {errors.location && <p className="text-danger small">{errors.location}</p>}
              </div>
            </div>

            {/* Date */}
            <div className="row mb-4 align-items-center">
              <label className="col-md-3 col-form-label fw-semibold text-dark">Select Lost Date</label>
              <div className="col-md-9">
                <input
                  type="date"
                  className="form-control form-control-sm rounded-pill"
                  value={ldate}
                  onChange={(event) => setLdate(event.target.value)}
                />
                {errors.ldate && <p className="text-danger small">{errors.ldate}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={returnBack}
              >
                ⬅ Back
              </button>
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LostItemSubmit;
