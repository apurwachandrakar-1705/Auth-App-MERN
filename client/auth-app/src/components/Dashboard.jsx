import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
const Dashboard = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);

  const DashboardValid = async () => {
    
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("http://localhost:3000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (!data) {
      navigate("*");
    } else {
      setLoginData(data);
      navigate("/dash");
    }
  };
  useEffect(() => {
    DashboardValid();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="./man.png"
          style={{ width: "200px", marginTop: "20px" }}
          alt=""
        />
         {loginData?.validUser ? (
          <h1>User Email: {loginData.validUser.email}</h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;
