import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [password, setpassword] = useState(false);
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [submit, setsubmit] = useState(false);

  function check() {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(phone);
    console.log(age);

    const user = {
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
      phone: `${phone}`,
      age: `${age}`,
    };

    console.log(JSON.stringify(user));
    fetch("http://localhost:8765/api/v1/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function nameValidation(data) {
    if (data === "") {
      document.getElementById("errorName").innerHTML =
        "User name field should not be empty.";
    } else if (!data.match("^([a-zA-Z]+(\\s[a-zA-Z]+)?)$")) {
      document.getElementById("errorName").innerHTML =
        "User name can only contain alphabets.<br > A space is allowed between first name and last name.";
    } else {
      document.getElementById("errorName").innerHTML = "";
    }
  }
  function emailValidation(data) {
    if (data === "") {
      document.getElementById("errorEmail").innerHTML =
        "Email field should not be empty.";
    } else if (!data.match("^[a-zA-Z0-9._%+-]+[a-zA-Z]+@gmail.com$")) {
      document.getElementById("errorEmail").innerHTML = "Email is not correct.";
    } else {
      document.getElementById("errorEmail").innerHTML = "";
    }
  }
  function passValidation(data) {
    if (data !== "" && data.length < 5) {
      document.getElementById("strongability").innerHTML = "Weak password...";
      document.getElementById("strongability").style.color = "red";
    } else if (data !== "" && data.length < 9) {
      document.getElementById("strongability").innerHTML = "Medium password...";
      document.getElementById("strongability").style.color = "darkblue";
    } else if (data !== "" && data.length > 8) {
      document.getElementById("strongability").innerHTML = "Strong password...";
      document.getElementById("strongability").style.color = "lightgreen";
    } else {
      document.getElementById("strongability").innerHTML = "";
    }

    if (data === "") {
      document.getElementById("errorPass").innerHTML =
        "Password field should not be empty.";
    } else if (!data.match("(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W])")) {
      document.getElementById("errorPass").innerHTML =
        "At least one capital letter should be there.<br>At least one number should be there.<br>At least one special character should be there.";
    } else {
      document.getElementById("errorPass").innerHTML = "";
    }

    if (data !== "" && document.getElementById("errorPass").innerHTML === "") {
      setpassword(true);
    } else {
      setpassword(false);
    }
  }

  function cPassValidation(data){
      if(data!==document.getElementById("password").value){
        document.getElementById("errorCPass").innerHTML = "password mismatch.";
        document.getElementById("errorCPass").style.color="red";
      }else{
        document.getElementById("errorCPass").innerHTML = "password matched.";
        document.getElementById("errorCPass").style.color="green";
      }

  }

  function ageValidation(data){
    
  }

  return (
    <div id="formContainer">
      <form id="form" className="rounded shadow" action="#" method="POST">
        <fieldset>
          <h1
            className="fw-bold fs-4"
            style={{
              color: "white",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            Registration Form
          </h1>

          <div id="fullName">
            <input
              type="text"
              className="form-control"
              onChange={(e) => nameValidation(e.target.value)}
              name="fName"
              pattern="^[a-zA-Z]+(\\s[a-zA-Z]+)?$"
              id="name"
              placeholder="Enter name"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="text-danger mx-2" id="errorName"></p>
            </div>
          </div>

          <div id="otherInputs">
            <input
              type="email"
              className="form-control"
              onChange={(e) => emailValidation(e.target.value)}
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id="email"
              placeholder="Enter Email Address"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="text-danger mx-2" id="errorEmail"></p>
            </div>

            <input
              type="password"
              className="form-control"
              onChange={(e) => passValidation(e.target.value)}
              name="password"
              id="password"
              placeholder=" Enter Password"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2" id="strongability"></p>
            </div>
            <div style={{ textAlign: "left", marginTop: "-12px" }}>
              <p className="text-danger mx-2" id="errorPass"></p>
            </div>

            {password ? (
              <input
                type="password"
                className="form-control"
                onChange={(e) => cPassValidation(e.target.value)}
                name="confirm password"
                id="cpassword"
                placeholder=" Confirm Password"
                required
              />
            ) : (
              
              <input
                type="password"
                className="form-control"
                onChange={(e) => cPassValidation(e.target.value)}
                name="confirm password"
                id="cpassword"
                placeholder=" Confirm Password"
                disabled
              />
              
            )}
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2" id="errorCPass"></p>
            </div>
            <input
              type="number"
              className="form-control"
              onChange={(e) => ageValidation(e.target.value)}
              name="age"
              id="age"
              min="1"
              max="100"
              placeholder="Enter Age"
              required
            />

            <input
              className="form-control"
              type="mobile"
              onChange={(e) => setphone(e.target.value)}
              pattern="[0-9]{10}"
              name="phone"
              id="phone"
              placeholder="Enter Mobile  Number"
              required
            />
          </div>

          <br />
          <br />

          {submit ? (
            <Link to="/login">
              <input
                type="submit"
                className="btn"
                name="submit"
                onClick={check}
                id="submit"
              />
            </Link>
          ) : (
            <input type="submit" className="btn" name="submit" id="submit" />
          )}
        </fieldset>
      </form>
    </div>
  );
}
