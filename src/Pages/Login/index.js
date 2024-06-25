import React, { useState } from "react";
import { auth } from "../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  setAdminLoginData,
  setAdminLogged,
  setIsAdmin,
} from "../../Routes/Slices/adminLogin";
import { useDispatch } from "react-redux";
import { setIsPopUp } from "../../Routes/Slices/dashBoardSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [regLogin, setRegLogin] = useState({});

  const checkAdmin = async () => {
    const data = new FormData();

    data.append("userEmail", regLogin.userEmail);
    data.append("userPassword", regLogin.userPassword);
    await axios
      .post("https://pavithrakrish95.pythonanywhere.com/login", data)
      .then((res) => {
        if (res.data.userStatus === "Approved") {
          dispatch(setAdminLoginData(res.data));
          console.log("res", res.data.userStatus);
          dispatch(setAdminLogged(true));
          dispatch(setIsAdmin(true));
          alert("Admin login successfull!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("user", res.data.userEmail);

          navigate("/dashboard");
        } else {
          alert("Enter valid email or password");
        }
      })
      .catch((err) => {
        console.log("error", err);
        alert(err);
      });
  };

  return (
    
    <div
      style={{
        backgroundImage: "url('image1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div className="container my-auto ">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                      Sign in
                    </h4>
                    <div className="row mt-3">
                      <div className="col-2 text-center ms-auto">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-facebook text-white text-lg"></i>
                        </a>
                      </div>
                      <div className="col-2 text-center px-1">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-github text-white text-lg"></i>
                        </a>
                      </div>
                      <div className="col-2 text-center me-auto">
                        <a className="btn btn-link px-3" href="javascript:;">
                          <i className="fa fa-google text-white text-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form role="form" className="text-start">
                    <div className="input-group input-group-outline my-3">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        onKeyUp={(e) =>
                          setRegLogin({
                            ...regLogin,
                            userEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onKeyUp={(e) =>
                          setRegLogin({
                            ...regLogin,
                            userPassword: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-primary w-100 my-4 mb-2"
                        onClick={() => checkAdmin()}
                      >
                        Sign in
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-center">
                      Don't have an account?
                      <Link
                        to="/register"
                        className="text-primary text-gradient font-weight-bold"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
