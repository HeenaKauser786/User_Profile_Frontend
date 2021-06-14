import React from "react";
import { Link } from "react-router-dom";
import "./DisplayCard.css";

export default function DisplayCard(props) {
  function forLike() {
    
    if (props.isLiked === "false") {
      console.log("liking false");
     
      
      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "true",
        posterUrl: props.posterUrl,
        isFavourite: "false",
        isRecommended: "false",
      };
      fetch(`http://localhost:8765/api/v2/movies/updateLike`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
    else {
      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "false",
        posterUrl: props.posterUrl,
        isFavourite: "false",
        isRecommended: "false",
      };
      fetch(`http://localhost:8765/api/v2/movies/updateLike`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
    props.setLikeFunc();
  }
  return (
    <div className="container my-4 pb-5 text-center">
      <div className=" container box p-4 my-4 w-50">
      <Link to={`/movieDetail/${props.movieid}`}><img src={props.posterUrl} alt="" className="w-50" /></Link>

        <h4 className="mt-4">{props.title}</h4>
        <div>
            {props.status && (
              <small>
                {props.isLiked==="true"? (
                  <i
                    className="fa fa-2x fa-heart text-danger"
                    onClick={forLike}
                  ></i>
                
                ):( 
                  <i className="fa fa-2x fa-heart-o" onClick={forLike}></i>
                )}
              </small>
            )
            }
            {props.status&&<span className="mx-1 fs-5">{props.likeCounts}</span>}
          </div>
        
      </div>
    </div>
  );
}
