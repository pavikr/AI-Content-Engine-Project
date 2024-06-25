
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setFbCategory,
  setFbType,
  setSelectedCategory,
  setCategoryAndTypes,
  setFbGeneratedDatas,
  setCategoryWithTypesWithTemplates,
  setSelectTemplate,
} from "../../Routes/Slices/templateSlice";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ListExample from "../Navbar";

const Template = () => {
  const token = localStorage.getItem("token");
  const currentLoginUserId = localStorage.getItem("userId");
  const headers = { 'Authorization': `Bearer ${token}` };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    fbCategory = [],
    fbType = [],
    selectedCategory = [],
    categoryAndTypes = [],
    fbGeneratedDatas = [],
    categoryWithTypesWithTemplates = [],
    selectTemplate = {},
  } = useSelector((state) => state.template);

  const [selectType, setSelectType] = useState([]);
  const [regen, setRegen] = useState(false);

  const fetchCategory = async () => {
    try {
      const dbCategory = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/settingGetList/${currentLoginUserId}`,{headers}
      );
      dispatch(setFbCategory(dbCategory.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const dbType = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/settingGetAllType/${currentLoginUserId}`,{headers}
      );
      dispatch(setFbType(dbType.data));
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const fetchTemplate = async () => {
    try {
      const dbTemplate = await axios.get(
        `https://pavithrakrish95.pythonanywhere.com/dataBaseGetGeneratedDatas/${currentLoginUserId}`,{headers}
      );
      dispatch(setFbGeneratedDatas(dbTemplate.data));
      console.log('te',dbTemplate.data)
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const templateInsideTypes = () => {
    const cat = fbCategory.map((category) => {
      const typesForCategory = fbType
        .filter((type) => type.categoryId === category.categoryId)
        .map((doc) => {
          const templatesForType = fbGeneratedDatas.filter(
            (data) => data.typeId === doc.typeId
          );
          return {
            type: doc.typeName,
            templates: templatesForType.map((template) => ({
              template: template.templates,
              datas: template.datas,
              id: template.generatedDataId,
            })),
          };
        });
      return { category, types: typesForCategory };
    });
    dispatch(setCategoryWithTypesWithTemplates(cat));
  };

  useEffect(() => {
    fetchCategory();
    fetchTypes();
    fetchTemplate();
  }, []);

  useEffect(() => {
    if (selectType.length > 0) {
      templateInsideTypes();
    }
  }, [selectType, fbCategory, fbType, fbGeneratedDatas]);

  const handleCategoryClick = (categoryId, categoryName) => {
    const types = fbType.filter((type) => type.categoryId === categoryId);
    dispatch(setSelectedCategory(types));
  };

  const handleTypeClick = (typeId) => {
    const selectedTemplates = fbGeneratedDatas.filter(
      (data) => data.typeId === typeId
    );
    setSelectType(selectedTemplates);
  };

  const handleTemplateSelected = (temp, datas, id) => {
    dispatch(setSelectTemplate({ temp, datas, id }));
    setRegen(true);
  };
  console.log('t',selectTemplate)

  const handleRegenerateToDashboard = () => navigate("/dashboard");
  const handleContentEdit = (e) => {
    const editedTemplate = { ...selectTemplate, temp: e.target.value };
    dispatch(setSelectTemplate(editedTemplate));
  };

  const handleSubmit = () => {
    navigate(`/finalPage/${selectTemplate.id}/${currentLoginUserId}`);
  };

  return (
    <>
    <center>
      <header>
              <ListExample/>
          </header>
          <div>
          
      {/* <h2 style={{ color: 'white' }} className="fs-2 text-center">Welcome to the template page</h2> */}
      <h5 style={{ color: 'black', fontFamily: 'Arial, sans-serif' }} className="fs-3 mt-4">Select Email Recipient</h5>


      <div className="row mt-5">
      {fbCategory.map((cat, i) => (
        <div className="col-md-2 mb-4" key={i}>
          <div className="card">
            <div className="card-body text-center">
              <p className="card-text cat">
                <i className="fas fa-user me-1"></i>{cat.categoryName}
              </p>
              <button
                className="btn-class-name"
                onClick={() => handleCategoryClick(cat.categoryId, cat.categoryName)}
                style={{ width: "50%", cursor: "pointer" }}
              >
                <span className="back"></span>
                <span className="front">click</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {selectedCategory && (
  <div className="row mt-5" style={{ position: 'sticky', top: '0', background: 'linear-gradient(89.5deg, rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3%)' }}>
    <h5 style={{ color: 'black', fontFamily: 'Arial, sans-serif' }} className="fs-3">Select Email Type</h5>
    {selectedCategory.map((typ, i) => (
     <div className="col-md-3" key={i}>
              <div className="card">
                <div className="card-body text-center">
                  <p className="card-text cat">{typ.typeName}</p>
                  <button
                    className="btn bg-gradient-success mb-0 mx-auto"
                    onClick={() => handleTypeClick(typ.typeId)}
                    style={{ width: "10rem", cursor: "pointer" }}
                  >
                    Choose
                  </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    {selectType.length > 0 && (
      <div className="row mt-5 justify-content-center">
        <h5 style={{ color: 'black', fontFamily: 'Arial, sans-serif' }}  className="fs-3">Select Template</h5>
        <div className="col-md-6">
          <div id="templateCarousel" className="carousel slide" data-bs-ride="carousel">
            
              {selectType.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#templateCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
           
            <div className="carousel-inner">
              {selectType.map((temp, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <div className="card">
                    <div
                      className="card-body text-start"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        background: 'linear-gradient(89.5deg, rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3%)'
                      }}
                    >
                      <p className="card-text">{temp.templates}</p>
                      <br />
                      <center>
                        <button
                          className="btn bg-gradient-primary mb-0 mx-auto text-center"
                          onClick={() => handleTemplateSelected(temp.templates, temp.datas, temp.generatedDataId)}
                          style={{ width: '10rem', cursor: 'pointer' }}
                        >
                          Choose
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#templateCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#templateCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    )}

    <Modal
      show={regen}
      onHide={() => setRegen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Email Preview! You can edit your email!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          value={selectTemplate.temp}
          style={{
            width: "100%",
            height: "60vh",
            border: "none",
            padding: "10px",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
            resize: "none",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            boxSizing: "border-box",
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="primary" onClick={handleSubmit}>
          Choose Template
        </Button>
        <Button variant="info" onClick={handleRegenerateToDashboard}>
          Re-Generate
        </Button>
        <Button variant="danger" onClick={() => setRegen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </div>

  <br />
  <br />
  <br />
</center>
</>
  );
};

export default Template;
