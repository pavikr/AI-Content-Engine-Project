import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./Pages/Firebase/firebase";
import AdminLogin, { setAdminLoginData, setAdminLogged, setSuperAdminLogged } from "./Routes/Slices/adminLogin";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Dashboard from "./Pages/Generate";
// import GooglePay from "./Pages/Payment";
import Categories from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Template from "./Pages/Template";
import FinalPage from "./Pages/FormPage";
import SuperAdmin from "./Pages/SuperAdmin";
import AdminLoginUser from "./Pages/AdminLoginUser";



function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { adminLoginData, adminLogged, isAdmin ,superAdminLogged} = useSelector(
    (state) => state.adminLogin
  );

  useEffect(() => {
    if (!adminLogged) {
      if (localStorage.getItem("token")) {
        dispatch(setAdminLogged(true));
        // checkLoginAuth();
      }
    }
  }, []);

  const checkLoginAuth = async () => {
    // await onAuthStateChanged(auth, (currentUser) => {
    //   localStorage.setItem("token", currentUser.accessToken);
    //   dispatch(setAdminLoginData(currentUser));
    //   dispatch(setAdminLogged(true));
    // });
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/adminLogin" element={<AdminLoginUser/>} />
        
        {
          superAdminLogged &&  <Route path="/admin" element ={<SuperAdmin/>}/>
        }
        {adminLogged && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/template" element={<Template />} />
            <Route path="/finalPage/:id/:currentLoginUserId" element={<FinalPage />} />
         
            <Route path="/user/setting" element ={<Categories/>}/>
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
