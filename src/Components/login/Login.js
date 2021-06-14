import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

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
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Username"
                    required
                  />

                  <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <input type="checkbox" id="remember" />

                  <Link to="/">
                    <button
                      type="submit"
                      onClick={fetchReq}
                      className="btn-signin"
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="submit" className="btn-signin">
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
