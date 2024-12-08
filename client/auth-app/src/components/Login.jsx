import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mix.css";
const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    console.log(email);
    if (email === "") {
      toast.info("Email is required...", {
        position: "top-center",
      });
      return;
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email...", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password is Required...", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("Contain more than 6 letters", {
        position: "top-center",
      });
    } else {
      const data = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await data.json();
      console.log(res);
     if (res.status === 201) {
  localStorage.setItem("usersdatatoken", res.result.token);
  navigate("/dash");
} else {
  toast.error("Login failed. Please try again.");
}
      setUserData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back,Log In</h1>
            <p>Hi,we are glad you are back,please login.</p>
            <form>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input
                  value={userData.email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your email Address"
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <input
                    value={userData.password}
                    onChange={handleChange}
                    type={passShow ? "password" : "text"}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                  />
                  <div
                    onClick={() => setPassShow((prev) => !prev)}
                    className="showpass"
                  >
                    {passShow ? "hide" : "show"}
                  </div>
                </div>
              </div>
              <button onClick={loginUser} className="btn">
                Login
              </button>
              <ToastContainer />
              <p>
                Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
