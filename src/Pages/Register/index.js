import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser'


const Register =  () => {
  const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [registerData,setRegisterData] = useState({
      userStatus:'Requested'
    })

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      if (!registerData.userName || !registerData.userEmail || !registerData.userPassword){
        alert('Please Fill All Fields');
        return;
      }
      const formData = new FormData()
      formData.append('userName',registerData.userName)
      formData.append('userEmail',registerData.userEmail)
      formData.append('userPassword',registerData.userPassword)
      formData.append('userStatus',registerData.userStatus)

      await axios.post('https://pavithrakrish95.pythonanywhere.com/postRegisteredUser',formData).then((res)=>{
        console.log('res',res.data.userStatus)
        if(res.data.userStatus === 'Requested'){
          
      const data = {
        to_name:registerData.userName,
        message:"provide access to this email",
        subject:"Content Engine user Approval notification"
      } 
        emailjs
        .send('service_k5uovth','template_1gvuhk8',data, 'zWRbPEy2MWvmTMoHr')
        .then(
          (result) => {
            console.log('SUCCESS!',result.text);
            alert('Email send successfull✔️')
            
          },
          (error) => {
            console.log('FAILED...', error.text);
            console.log('error',error)
            alert('Email send failed❌')
          },)
          setRegisterData({userName:"",userEmail:"",userPassword:""})
        }
      })
    navigate('/')
    };
  return (
    <>
   



<main className="main-content main-content-bg mt-0 vh-100 d-flex align-items-center">
  <div className="container  justify-content-between">
    <div className="row justify-content-between">
      <div className="col-lg-10 col-md-12 mx-auto">
        <div className="row">
         
          <div className="col-lg-6 col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <img src="Header-image-1-Content-writing.png" className="img-fluid w-70" alt="Description of the image"/>
          </div>
         
          <div className="col-lg-6 col-md-6">
            <div className="card mt-8">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1 text-center py-4">
                  <h4 className="font-weight-bolder text-white mt-1">Join us today</h4>
                  <p className="mb-1 text-white text-sm">Enter your email and password to register</p>
                </div>
              </div>
              <div className="card-body pb-3">
                <form role="form">
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter user name"
                      onChange={(e) =>
                        setRegisterData({ ...registerData, userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) =>
                        setRegisterData({ ...registerData, userEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="password"
                      className="form-control"
                      required
                      placeholder="Enter password"
                      onChange={(e) =>
                        setRegisterData({ ...registerData, userPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn bg-gradient-primary w-100 mt-4 mb-0"
                      onClick={handleSubmit}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center pt-0 px-sm-4 px-1">
                <p className="mb-4 mx-auto">
                  Already have an account?
                  <Link to="/" className="text-primary text-gradient font-weight-bold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</>
  );
};

export default Register;
