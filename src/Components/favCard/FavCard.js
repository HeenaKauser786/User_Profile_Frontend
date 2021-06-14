import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./FavCard.css";

export default function FavCard(props) {
  
  function forLike() {
    
    if (props.isLiked === "false") {
      console.log("setting true");
     
      
      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "true",
        posterUrl: props.posterUrl,
        isFavourite: "true",
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
        console.log("setting false");
      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "false",
        posterUrl: props.posterUrl,
        isFavourite: "true",
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

  function deleteFunc() {
    fetch(`http://localhost:8765/api/v2/movies/delete/${props.movieid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      props.deleteFunc()
  }

  return (
    <div className="col-md-3 mt-3">
      <div className="card">
        <div className="box w-100 p-2">
          <Link to={`/movieDetail/${props.movieid}`}>
            <img
              src={props.posterUrl}
              alt=""
              className="w-100"
              height="300px"
            />
          </Link>

          <h6 className="mt-4">{props.title}</h6>
          <p>{props.description}</p>
          <div>
            
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
            

            <span className="mx-1 fs-5">{props.likeCounts}</span>
          </div>
          <div className="text-white fw-bold bg-danger delete" onClick={deleteFunc}>
                    Delete
        </div>
        </div>
        
      </div>
    </div>
  );
}
