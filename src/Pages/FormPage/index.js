import React, { useEffect, useRef, useState } from "react";
import { setDatas, setGenerateDatas } from "../../Routes/Slices/templateSlice";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { json, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setIsPopUp } from "../../Routes/Slices/dashBoardSlice";
import emailjs from '@emailjs/browser'


const FinalPage = () => {
  const form = useRef()
  const dispatch = useDispatch();
  const { id ,currentLoginUserId} = useParams();
  const navigate=useNavigate()
  const token = localStorage.getItem("token")
  const headers = {'Authorization':`Bearer ${token}`}
  

  const { generateDatas, datas } = useSelector((state) => state.template);
  console.log("id", id);
  const [formData, setFormData] = useState([]);
  const [show, setShow] = useState(false);
  const [template, setTemplate] = useState("");
  const [toEmail,setToEmail] = useState('');
  const [subject, setSubject] = useState('');

  const getData = async (i,c) => {
    const dbTemplate = await axios
      .get(`https://pavithrakrish95.pythonanywhere.com/getSelectedTemplate/${i}/${c}`,{headers})
      .then((res) => {
        // dispatch(setGenerateDatas(res.data));
        const parsedData = JSON.parse(res.data.datas);
        dispatch(setDatas(parsedData));
        // console.log("parse", parsedData);
      });
  };

  const handleValueChange = (index, event) => {
    const newFormData = [...formData];
    newFormData[index] = event.target.value;
    setFormData(newFormData);
  };
  // console.log("formData", formData);

  const handleClose = () => {
    setShow(false);
  };
  const handleBack = () => {
    navigate('/template')
  };


  const handleFormSave = async () => {
    setShow(true);
    const dbTemplate = await axios
      .get(`https://pavithrakrish95.pythonanywhere.com/getSelectedTemplate/${id}/${currentLoginUserId}`,{headers})
      .then((res) => {
        const dbTemplates = res.data.templates;
        const dbDatas = JSON.parse(res.data.datas);

        const valueArray = dbDatas.map((pair) => pair.value);
        const keyArray = dbDatas.map((pair) => pair.key);

        // console.log("valueArray", valueArray);
        // console.log("keyArray", keyArray);

        let newTemplates = dbTemplates;

        // console.log("paragraph",paragraph);

        keyArray.forEach((key, index) => {
          if (newTemplates.includes(key)) {
            newTemplates = newTemplates.replace(
              new RegExp(`\\[Enter ${key}\\]`, "g"),
              `${formData[index]}`
            );
            setTemplate(newTemplates);
          }
        });
      });
  };

  useEffect(() => {
    getData(id,currentLoginUserId);
  }, []);
  // console.log("new gen", generateDatas);
    const sendEmail = ()=>{
    const data = {
      to_email:toEmail,
      message:template,
      subject:subject
    } 
      emailjs
      .send('service_k5uovth', 'template_peaed7n',data, 'zWRbPEy2MWvmTMoHr')
      .then(
        (result) => {
          console.log('SUCCESS!',result.text);

          alert('Email send successfull✔️')
        },
        (error) => {
          console.log('FAILED...', error.text);
          console.log('error',error)
          alert('Email send failed❌')
        },
      );
    }

  return (
    <>
      <center>
        <h2>Add Your Details Here!</h2>
      </center>
      <div
        style={{
          width: "700px",
          margin: "100px auto",
        }}
      >
        {datas.map((doc, index) => (
          <FloatingLabel 
            controlId={`floatingInput${index}`}
            key={index}
            label={doc.key}
            className="mb-3"
            style={{
              textTransform: "capitalize",
              margin: "34px 0",
            }}
          >
            <Form.Control
              placeholder={doc.key}
              onChange={(event) => handleValueChange(index, event)}
            />
          </FloatingLabel>
        ))}
        <Button type="button" variant="primary" onClick={handleFormSave}>
          Proceed
        </Button>
          <Button variant="dark" onClick={()=>handleBack()}>
            Back</Button>
      </div>

      <Modal  size="lg" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title><center>Email</center></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel 

            key={1}
            label='Enter email'
            className="mb-3"
          >
            <Form.Control
              placeholder='Enter Recipients email'
              name="to_email"
              value={toEmail}
              onChange={(e)=>setToEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel 

                key={1}
                label='Enter Subject'
                className="mb-3"
                >
                <Form.Control
                  placeholder='Enter Subject'
                  name="subject"
                  value={subject}
                  onChange={(e)=>setSubject(e.target.value)}
                />
            </FloatingLabel>
          <textarea 
            value={template}
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
          onChange={(e)=>setTemplate(e.target.value)}
          name="message"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>sendEmail()}>
            Send Email
          </Button>
          <Button variant="dark" onClick={()=>handleBack()}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinalPage;