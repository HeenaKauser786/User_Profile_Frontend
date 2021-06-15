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
          </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/">
                <button className="btn nav-link active" aria-current="page">
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item">
              {props.loggedStatus ? (
                <Link to="/favourite" className="btn nav-link lh-auto">
                  Favourite
                </Link>
              ) : null}
            </li>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder={placeholder}
                onChange={(e) =>check(e.target.value)}
                aria-label="Search"
              />

              {checkPre ? (
              <Link to="/">
                  <button
                    id="search"
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                  </Link>
              ) : (
                <Link to={`/Search/${title}`}>
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </Link>
              )}
            </form>
          </ul>
          <li className="nav-item">
            {console.log(props.loggedStatus)}
            {props.loggedStatus ? (
              <Link to="/logout" type="button" className="btn btn-light">
                Logout
              </Link>
            ) : (
              <Link to="/login" type="button" className="btn btn-light">
                Login
              </Link>
            )}
          </li>
        </div>
      </div>
    </nav>
  );
}
