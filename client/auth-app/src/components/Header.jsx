import React, { useContext } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  return (
    <header>
      <nav>
        <h1>AP-CLOUD</h1>

        <div className="avtar">
          {loginData?.validUser? (
            <Avatar style={{ background: "salmon",fontWeight:"bold",textTransform:"capitalize"}}>
              {loginData.validUser.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar style={{ background: "blue" }}>A</Avatar>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
