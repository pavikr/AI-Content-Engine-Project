import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <h2>Welcome to AI GENERATE CONTENT ENGINE</h2>
      <button type="button ">
        <Link to={"/admin/login"}>Admin</Link>
      </button>
      <button type="button">
        <Link to={"/user/logOrReg"}>User</Link>
      </button>
    </div>
  );
};

export default Index;
