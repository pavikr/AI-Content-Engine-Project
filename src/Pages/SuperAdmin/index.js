import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";


const SuperAdmin = () => {
  const [registerData, setRegisterData] = useState([]);
  const [isDisabled,setIsDisabled] = useState(false)
const navigate=useNavigate()
  const fetchRegistData = async () => {
    const getData = await axios.get(
      "https://pavithrakrish95.pythonanywhere.com/getRegisteredUser"
    );
    setRegisterData(getData.data);
  };
  console.log("registerData", registerData);

  useEffect(() => {
    fetchRegistData();
  }, []);
  const changeStatus = async (approvedId) => {
    console.log("approvedId",approvedId);
    const formData = new FormData();
    const newchange = 'Approved'
    formData.append("userStatus", newchange);
    await axios.put(
      `https://pavithrakrish95.pythonanywhere.com/editUserStatus/${approvedId}`,
      formData
    ).then((res)=>{
      console.log('res',res.data)
    }).catch((error)=>{
      console.log('err',error)
    });
    fetchRegistData();
    setIsDisabled(true)
    navigate('/')
  };
  return (
    <div>
      <center>
        <h2>Super Admin</h2>
      </center>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
           
          </tr>
        </thead>
        <tbody>
          {registerData.map((datas, index) => (
            <tr key={index}>
              <td>{datas.userId}</td>
              <td>{datas.userName}</td>
              <td>{datas.userEmail}</td>
              <td>{datas.userPassword}</td>
              
              <td>
                <button
                className={datas.userStatus == 'Requested' ? 'btn btn-danger' : 'btn btn-success'}
                  variant="info"
                  onClick={() => changeStatus(datas.userId)}
                  disabled={datas.userStatus === 'Approved'}
                >
                  Approved
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SuperAdmin;
