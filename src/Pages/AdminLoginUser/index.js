import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { setSuperAdminLogged } from "../../Routes/Slices/adminLogin";

const AdminLoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email,setEmail] = useState('owner@gmail.com')
  const [password,setPassword] = useState('owner123')

  const [regLogin, setRegLogin] = useState({});
  console.log('regLogin',regLogin);


  const checkAdmin = async ()=> {
    if (!email || !password){
      alert('Please fill all the data')
   }

    else if (email === regLogin.ownerEmail && password === regLogin.ownerPassword){
        dispatch(setSuperAdminLogged(true))
        navigate("/admin")
    }
       
  }

  return (
    <center>
      <div>
       
        <form>
         
            
          <div>
            <label>Admin email:</label>
            <input
              placeholder="Enter email"
              type="email"
              onKeyUp={(e) =>
                setRegLogin({ ...regLogin, ownerEmail: e.target.value })
              }
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              placeholder="Enter password"
              type="password"
              onKeyUp={(e) =>
                setRegLogin({ ...regLogin, ownerPassword: e.target.value })
              }
            />
          </div>
          <div>
            <Button type="button" variant="primary" onClick={()=>checkAdmin()}>
              Sign In
            </Button>
          </div>
         
        </form>
        <br />
       
      </div>
      
    </center>
  );
};

export default AdminLoginUser;
