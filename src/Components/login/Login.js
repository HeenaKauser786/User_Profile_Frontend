import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [submit, setsubmit] = useState(false);

  useEffect(() => {
    if(email!==""&&password!==""){
      setsubmit(true);
      document.getElementById('errorForm').innerHTML=""
    }else{
      setsubmit(false);
      document.getElementById('errorForm').innerHTML=""
    }
  }, [email,password])

  const user = {
    email: email,
    password: password,
  };

  function fetchReq() {
   

    fetch("http://localhost:8765/api/v1/login", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        props.loginStatus(true);
      })
      .catch((error) => console.log(error));
      localStorage.setItem("userName",email.substring(0,email.indexOf("@")));
  }
  function emailValidation(data) {
    if (data === "") {
      document.getElementById("errorEmail").innerHTML =
        "Email field should not be empty.";
        setemail("");
    } else if (!data.match("^[a-zA-Z0-9._%+-]+[a-zA-Z]+@gmail.com$")) {
      document.getElementById("errorEmail").innerHTML = "Email is not correct.";
      setemail("");
    } else {
      document.getElementById("errorEmail").innerHTML = "";
      setemail(data);
    }
  }
  function passValidation(data) {
    if (data === "") {
      document.getElementById("errorPass").innerHTML = "Password field is required.";
      document.getElementById("errorPass").style.color = "red";
      setpassword("");
    }
    else{
      document.getElementById("errorPass").innerHTML = "";
      setpassword(data);
    } 
  }
  function formInvalid(){
    document.getElementById("errorForm").innerHTML="Form is incomplete."
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <div className="sign-panels">
              <div className="login">
                <form action="">
                  <input
                    type="text"
                    onChange={(e) => emailValidation(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <div style={{ textAlign: "left", marginTop: "-10px" }}>
                    <p className="text-danger mx-4 fs-6" id="errorEmail"></p>
                  </div>
                  <input
                    type="password"
                    onChange={(e) => passValidation(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <div style={{ textAlign: "left", marginTop: "-12px" }}>
                    <p className="text-danger mx-4" id="errorPass"></p>
                  </div>

                  <div>
                    <p className="text-danger mx-4" id="errorForm"></p>
                  </div>

                  {submit ? (
            <Link to="/">
              <button onClick={fetchReq} type="submit" className="btn btn-signin">
                      Login
              </button>
            </Link>
          ) : (
            <div className="btn btn-signin" onClick={formInvalid}>Login</div>
          )}
                  <Link to="/register">
                    <button type="submit" className="btn btn-signin">
                      Register
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
