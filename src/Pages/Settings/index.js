 import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import {
  setCategories,
  setTypes,
  setCategoryName,
  setCategoryType,
  setSelectedCategory,
  setShowModal,
  setPreviewContent,
} from "../../Routes/Slices/settingsLogin";
import { useNavigate } from "react-router-dom";
import ListExample from "../Navbar";
import axios from "axios";
import "./index.css";

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settingstate = useSelector((state) => state.settings);

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const parsedData = localStorage.getItem("token");
  const currentLoginUserId = localStorage.getItem("userId");
  const headers = { Authorization: `Bearer ${parsedData}` };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/settingGetList/${currentLoginUserId}`,
        { headers }
      );
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchTypes = async (categoryId) => {
    if (!categoryId) return;
    try {
      const response = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/settingGetType/${categoryId}`,
        { headers }
      );
      dispatch(setTypes(response.data));
    } catch (error) {
      console.error("Error fetching types:", error);
      alert("Failed to fetch types. Please try again.");
    }
  };

  const openModal = () => {
    dispatch(setShowModal(true));
  };

  const closeModal = () => {
    dispatch(setShowModal(false));
  };

  const openTypeModal = (categoryId) => {
    fetchCategories();
    setCurrentCategoryId(categoryId);
    dispatch(setSelectedCategory(categoryId));
    setShowTypeModal(true);
    fetchTypes(categoryId);
    generatePreview(categoryId, settingstate.categoryType);
  };

  const closeTypeModal = () => {
    setShowTypeModal(false);
  };

  const handleCategorySubmit = async () => {
    if (!settingstate.categoryName) {
      alert("Please enter a category name");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryName", settingstate.categoryName);
      formData.append("userId", currentLoginUserId);

      const response = await axios.post(
        "https://pavithrakrish95.pythonanywhere.com/categoryList",
        formData,
        { headers }
      );
      const newCategory = {
        categoryId: response.data.categoryId,
        categoryName: settingstate.categoryName,
      };
      dispatch(setCategories([...settingstate.categories, newCategory]));
      dispatch(setCategoryName(""));
      closeModal();
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const handleCategoryTypeChange = (e) => {
    dispatch(setCategoryType(e.target.value));
  };

  const handleAddCategoryType = async () => {
    if (!currentCategoryId || !settingstate.categoryType) {
      alert("Please select a category and enter a category type");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("typeName", settingstate.categoryType);
      formData.append("categoryId", currentCategoryId);
      formData.append("userId", currentLoginUserId);

      const response = await axios.post(
        "https://pavithrakrish95.pythonanywhere.com/typeList",
        formData,
        { headers }
      );

      const typeDataResponse = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/settingGetAllType/${currentLoginUserId}`,
        { headers }
        
      );
      fetchCategories();

     
      const latestType = typeDataResponse.data.find(
        (type) =>
          type.typeName == settingstate.categoryType &&
          type.categoryId == currentCategoryId
      );

      const newType = {
        typeId: latestType.typeId,
        typeName: latestType.typeName,
        categoryId: latestType.categoryId,
      };
      dispatch(setTypes([...settingstate.types, newType]));
      dispatch(setCategoryType(""));
      closeTypeModal();
      alert("Category Type added successfully!");
    } catch (error) {
      console.error("Error adding category type:", error);
      alert("Failed to add category type. Please try again.");
    }
  };

  const generatePreview = (categoryId, categoryType) => {
    if (!categoryId || !categoryType) {
      return;
    }
    const createEmail = `Please give a "${getCategoryNameById(
      categoryId
    )}" related "${categoryType}" email!`;
    dispatch(setPreviewContent(createEmail));
  };

  const getCategoryNameById = (categoryId) => {
    const selectedCategory = settingstate.categories.find(
      (category) => category.categoryId === categoryId
    );
    return selectedCategory ? selectedCategory.categoryName : "";
  };

  const handleDeleteType = async (typeId) => {
    try {
      await axios.delete(
        `https://pavithrakrish95.pythonanywhere.com/deleteList/${typeId}`,
        { headers }
      );
      dispatch(
        setTypes(settingstate.types.filter((type) => type.typeId !== typeId))
      );
      alert("Type deleted successfully!");
    } catch (error) {
      console.error("Error deleting type:", error);
      alert("Failed to delete type. Please try again.");
    }
  };

  const handleNavigateGeneratePage = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <ListExample />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 col-12 text-center">
            <h1 className="mt-3 mb-4" style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Manage Email Recipients
            </h1>
          </div>
          <div className="col-lg-4 col-12 text-end">
            <button className="btn btn-dark" type="button" onClick={openModal}>
              Add Recipient
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body p-3">
              <div className="table-responsive">
                <table className="table table-striped align-items-center mb-0">
                  <caption className="text-center fs-5">Existing Email Recipients</caption>
                  <thead>
                    <tr>
                      <th className="text-uppercase text-xs font-weight-bold opacity-7 text-center fs-6">ID</th>
                      <th className="text-uppercase text-xs font-weight-bold opacity-7 ps-2 text-center fs-6">Recipient Name</th>
                      <th className="text-uppercase text-xs font-weight-bold opacity-7 ps-2 text-center fs-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settingstate.categories.map((category, index) => (
                      <tr key={category.categoryId}>
                        <td className="text-sm text-center">
                          <p className="mb-0 font-weight-normal text-sm">{index + 1}</p>
                        </td>
                        <td className="text-sm text-center">
                          <p className="mb-0 font-weight-normal text-sm">{category.categoryName}</p>
                        </td>
                        <td className="text-sm text-center">
                          <button className="btn btn-secondary btn-sm" onClick={() => openTypeModal(category.categoryId)}>
                            Add Email Type
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={settingstate.showModal} onHide={closeModal}>
        <center>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Enter Recipient's Name</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={settingstate.categoryName}
              onChange={(e) => dispatch(setCategoryName(e.target.value))}
              className="form-control"
              placeholder="Enter recipient's name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCategorySubmit}>
              Save
            </Button>
          </Modal.Footer>
        </center>
      </Modal>

      <Modal show={showTypeModal} onHide={closeTypeModal}>
        <center>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Enter Email Type</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={settingstate.categoryType}
              onChange={handleCategoryTypeChange}
              className="form-control"
              placeholder="Enter email type"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeTypeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddCategoryType}>
              Save
            </Button>
          </Modal.Footer>
        </center>
      </Modal>

      {settingstate.previewContent && (
        <div className="preview mt-3">
          <h3>Preview:</h3>
          <p>{settingstate.previewContent}</p>
        </div>
      )}

      <div className="card-body p-3">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-xs font-weight-bold opacity-7 text-center fs-6">ID</th>
                    <th className="text-uppercase text-xs font-weight-bold opacity-7 ps-2 text-center fs-6">Email Type</th>
                    <th className="text-uppercase text-xs font-weight-bold opacity-7 ps-2 text-center fs-6">Recipient</th>
                    <th className="text-uppercase text-xs font-weight-bold opacity-7 ps-2 text-center fs-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {settingstate.types.map((type, i) => (
                    <tr key={type.typeId}>
                      <td className="text-sm text-center">
                        <p className="mb-0 font-weight-normal text-sm">{i + 1}</p>
                      </td>
                      <td className="text-sm text-center">
                        <p className="mb-0 font-weight-normal text-sm">{type.typeName}</p>
                      </td>
                      <td className="text-sm text-center">
                        <p className="mb-0 font-weight-normal text-sm">{getCategoryNameById(type.categoryId)}</p>
                      </td>
                      <td className="text-sm text-center">
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteType(type.typeId)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
