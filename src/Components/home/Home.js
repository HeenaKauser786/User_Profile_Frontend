import React, { useEffect, useState } from "react";
import Card from "../card/Card";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);
  const [triggerForLike, settriggerForLike] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined){
      fetch("http://localhost:8765/api/v2/movies/getrandom",{
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }})
      .then((result) => result.json())
      .then((res) => {
        console.log(res.results);
        setMovie(res.results);
      });
    }
    else{
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=0c0b61ddfb12f5fa53e6d702c54139cc&language=hi-IN%C2%AEion=IN&sort_by=popularity.desc&page=1&primary_release_year=2018&with_original_language=hi"
      )
        .then((result) => result.json())
  
        .then((res) => {
          console.log(res.results);
  
          setMovie(res.results);
        });
    }
  
  },[triggerForLike]);

  function setLikeFunc() {
    setTimeout(() => {
      if(triggerForLike){
        settriggerForLike(false);
      }
      else{
        settriggerForLike(true)
      }
    }, 1000);
  }
  

  useEffect(() => {
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined){
      fetch(`http://localhost:8765/api/v1/movies/trending/${localStorage.getItem("email")}`)
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
    }
    else{
      fetch(`http://localhost:8765/api/v1/movies/trending/@gmail.com`)
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
    }
  }, [triggerForLike]);

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={process.env.PUBLIC_URL + "image/carosal1.jpg"}
              height="500px"
              weight="100%"
              className="d-block w-100"
              alt="carousal1"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              src={process.env.PUBLIC_URL + "image/carosal2.jpg"}
              height="500px"
              weight="100%"
              className="d-block w-100"
              alt="carousal2"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img
              src={process.env.PUBLIC_URL + "image/carosal3.jpg"}
              height="500px"
              weight="100%"
              className="d-block w-100"
              alt="carousal3"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-3" data-testid="outerdiv">
        <h4
          className="mt-5 fw-bold"
          style={{
            fontFamily: "Big Shoulders Stencil Display, cursive",
            textAlign: "left",
          }}
        >
          Trending Movies
        </h4>
        <div className="row" data-testid="innerdiv">
          {data.map((item) => (
            <Card
            key={item.id}
            rating={item.popularity}
            isLiked={item.isLiked}
            likeCounts={item.likeCount}
            overview={item.overview}
            setLikeFunc={setLikeFunc}
            posterUrl={
              "https://image.tmdb.org/t/p/original" + item.poster_path
            }
            movieid={item.id}
            title={item.title}
            status={props.loggedStatus}
            />
          ))}
        </div>
      </div>
      <section>
        <div data-testid="outerdiv" className="container mt-3 mb-5 pb-5">
          <div data-testid="innerdiv" className="row">
            <h4
              className="mt-5 fw-bold"
              style={{
                fontFamily: "Big Shoulders Stencil Display, cursive",
                textAlign: "left",
              }}
            >
              What's Popular
            </h4>

            {movie.map((item) => (
              <Card
                key={item.id}
                rating={item.popularity}
                isLiked={item.isLiked}
                likeCounts={item.likeCount}
                overview={item.overview}
                setLikeFunc={setLikeFunc}
                posterUrl={
                  "https://image.tmdb.org/t/p/original" + item.poster_path
                }
                movieid={item.id}
                title={item.title}
                status={props.loggedStatus}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
