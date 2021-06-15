import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function (props) {
  const [title, setTitle] = useState("");
  const [checkPre, setcheckPre] = useState(true);
  const [placeholder, setplaceholder] = useState("Enter movie name");
  function check(data) {
    if (data.length === 0) {
      setplaceholder("Please enter the movie");

      setcheckPre(true);
    } else {
      setTitle(data);
      setcheckPre(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            width="50px"
            height="40px"
          />
          <h5 className="text-white d-inline mx-2">Movie Cruiser</h5>
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item d-inline">
              <Link to="/" className="btn nav-link">
                <button className="btn nav-link d-inline" aria-current="page">
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item ">
              {props.loggedStatus ? (
                <Link to="/favourite" className="btn nav-link">
                  <button className="btn nav-link d-inline" aria-current="page">
                    Favourite
                  </button>
                </Link>
              ) : null}
            </li>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder={placeholder}
                onChange={(e) => check(e.target.value)}
                aria-label="Search"
              />

              {checkPre ? (
                <Link to="/">
                  <button
                    id="search"
                    className="btn btn-outline-success"
                    type="submit"
                    style={{marginTop:'10px'}}
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/Search/${title}`}>
                  <button id="search"
                    className="btn btn-outline-success" type="submit" style={{marginTop:'10px'}}>
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </Link>
              )}
            </form>
          </ul>

          <ul className="navbar-nav ml-auto mb-lg-0">
          <li className="nav-item">
            {console.log(props.loggedStatus)}
            {props.loggedStatus ? (
              <button className="btn nav-link d-inline" aria-current="page">
              <Link to="/logout" type="button" className="btn btn-light">
                
                  Logout
              
              </Link>
              </button>
            ) : (
              <button className="btn nav-link d-inline" aria-current="page">
              <Link to="/login" type="button" className="btn btn-light">
                
                  Login
                
              </Link>
              </button>
            )}
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
