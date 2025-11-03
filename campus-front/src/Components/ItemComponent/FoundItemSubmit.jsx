import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../LoginView.css";
import { getUserDetails } from "../../Services/LoginService";
import { foundItemSubmission, foundItemIdGenerator } from "../../Services/foundItemService";
import { deleteLostItemById}from "../../Services/lostItemService";
import { FaBoxOpen } from "react-icons/fa";

const FoundItemSubmit = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const prefilledItem = location.state?.item || null;

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
    founditemId: "",
    username: prefilledItem?.username || "",
    userEmail: prefilledItem?.userEmail || "",
    itemName: prefilledItem?.itemName || "",
    category: prefilledItem?.category || "",
    color: prefilledItem?.color || "",
    brand: prefilledItem?.brand || "",
    location: prefilledItem?.location || "",
    foundDate: "",
  });

  let [fdate, setFdate] = useState("");

  const setFoundItemId = () => {
        foundItemIdGenerator().then((response) => {
      setNewId(response.data);
    });
  };

  const setUserDetails = () => {
    getUserDetails().then((response) => {
      setCampusUser(response.data);
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUserDetails();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem((values) => ({ ...values, [name]: value }));
  };

  const foundItemFormSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;
     item.founditemId =  newId;
    item.username = campusUser.username;
    item.userEmail = campusUser.email;
    item.foundDate = fdate;

    try {
      await foundItemSubmission(item);
      alert("Found Item Form Submitted Successfully!");
 if (prefilledItem) {
        await deleteLostItemById(prefilledItem.itemId);
      }
      if (campusUser.role === "Admin") {
        navigate("/AdminMenu");
      } else {
        navigate("/StudentMenu");
      }
    } catch (err) {
      console.error(err);
      alert("Error while submitting found item.");
    }
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
      tempErrors.location = "Found Location is required";
      isValid = false;
    }
    if (!fdate) {
      tempErrors.fdate = "Found Date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const returnBack = () => {
    if (campusUser.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  return (
    
    <div style={{ background: "linear-gradient(135deg, #000000, #0044ff)" }}>
      <div
        className="container d-flex justify-content-center align-items-center py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000, #0044ff)",
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ width: "70%", backgroundColor: "#ffffff" }}
        >
          {/* Card Header */}
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
                  background: "linear-gradient(135deg, #000000, #0044ff)",
                  color: "#fff",
                }}
              >
                <FaBoxOpen size={35} />
              </div>
            </div>

            <h4 className="fw-bold mb-0">Found Item Submission</h4>
            <p className="tagline">Campus Lost & Found Portal</p>
          </div>

          {/* Card Body */}
          <div className="card-body p-4" style={{ backgroundColor: "#fdfdfd" }}>
            <form onSubmit={foundItemFormSubmit}>
              {/* Item Id */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Item Id
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="itemId"
                    className="form-control form-control-sm rounded-pill"
                     value={item.founditemId ? item.founditemId : newId}
                    readOnly
                  />
                </div>
              </div>

              {/* Item Name */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Item Name
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="itemName"
                    className="form-control form-control-sm rounded-pill"
                    placeholder="Enter found item name"
                    value={item.itemName}
                    onChange={onChangeHandler}
                    readOnly={!!prefilledItem}
                  />
                  {errors.itemName && (
                    <p className="text-danger small">{errors.itemName}</p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Category
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="category"
                    className="form-control form-control-sm rounded-pill"
                    placeholder="Enter item category"
                    value={item.category}
                    onChange={onChangeHandler}
                    readOnly={!!prefilledItem}
                  />
                  {errors.category && (
                    <p className="text-danger small">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Color */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Color
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="color"
                    className="form-control form-control-sm rounded-pill"
                    placeholder="Enter item color"
                    value={item.color}
                    onChange={onChangeHandler}
                    readOnly={!!prefilledItem}
                  />
                  {errors.color && (
                    <p className="text-danger small">{errors.color}</p>
                  )}
                </div>
              </div>

              {/* Brand */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Brand
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="brand"
                    className="form-control form-control-sm rounded-pill"
                    placeholder="Enter brand name (if any)"
                    value={item.brand}
                    onChange={onChangeHandler}
                    readOnly={!!prefilledItem}
                  />
                  {errors.brand && (
                    <p className="text-danger small">{errors.brand}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Found Location
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="location"
                    className="form-control form-control-sm rounded-pill"
                    placeholder="Where did you find it?"
                    value={item.location}
                    onChange={onChangeHandler}
                    readOnly={!!prefilledItem}
                  />
                  {errors.location && (
                    <p className="text-danger small">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* Found Date - Aligned to Right */}
              <div className="row mb-4 align-items-center">
                <label className="col-md-3 col-form-label fw-semibold text-dark">
                  Select Found Date
                </label>
                <div className="col-md-9">
                  <input
                    type="date"
                    className="form-control form-control-sm rounded-pill"
                    value={fdate}
                    onChange={(event) => setFdate(event.target.value)}
                  />
                  {errors.fdate && (
                    <p className="text-danger small">{errors.fdate}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={returnBack}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemSubmit;