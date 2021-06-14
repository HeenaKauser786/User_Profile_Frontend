import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Components/register/Register";
import SearchResult from "./Components/searchresult/SearchResult";
import Favourite from "./Components/favourite/Favourite";
import Logout from "./Components/logout/Logout";
import MovieDetail from "./Components/moviedetail/MovieDetail";


function App() {
 
  const [status, setStatus] = useState(false);

  function loginStatusFunc(stat) {
    setStatus(stat);
  }

  function logoutStatusFunc(state) {
    setStatus(state);
  }
  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined
    ) {
      setStatus(true);
    }
  }, []);
  return (
    
    <div className="App">
      <Router>
        <Header loggedStatus={status} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home loggedStatus={status} />}
          />
          <Route
            exact
            path="/login"
            component={() => <Login loginStatus={loginStatusFunc}></Login>}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Search/:title" component={() => <SearchResult loggedStatus={status} />} />
          <Route exact path="/favourite" component={Favourite} />
          <Route exact path="/movieDetail/:movieid" component={MovieDetail} />
          <Route
            exact
            path="/logout"
            component={() => <Logout logoutStatus={logoutStatusFunc}></Logout>}
          ></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
   
  );
}

export default App;
