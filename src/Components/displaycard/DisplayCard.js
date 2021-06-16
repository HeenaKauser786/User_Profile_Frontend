import React from "react";
import { Link } from "react-router-dom";
import "./DisplayCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DisplayCard(props) {
  toast.configure();
  function forLike() {
    if (props.isLiked === "false") {
      toast(`You liked ${props.title} movie`, { autoClose: 3000 });
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
    } else {
      toast(`Disliking ${props.title} movie`, { autoClose: 3000 });
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
    <div className="container my-4 pb-5 text-center ">
      <div className=" container box p-4 my-4 w-50">
        <Link to={`/movieDetail/${props.movieid}`}>
          <img src={props.posterUrl} alt="" className="w-100" />
        </Link>

        <h4 className="mt-4 text-decoration-underline">{props.title}</h4>
        <p className=" text-start">{props.overview}</p>

        {props.status && (
          <div
            id="contains"
            className={
              props.isLiked === "true"
                ? "shadow-lg border border-danger d-inline pt-3 pb-2 px-3 rounded"
                : "shadow bg-danger d-inline pt-3 pb-2 px-3 rounded"
            }
          >
            {
              <small>
                {props.isLiked === "true" ? (
                  <i
                    className="fa fa-2x fa-heart text-danger"
                    onClick={forLike}
                  ></i>
                ) : (
                  <i
                    className="fa fa-2x fa-heart text-white"
                    onClick={forLike}
                  ></i>
                )}
              </small>
            }
            {props.status && (
              <small className="mx-1 fs-4 pb-2 d-inline">
                {props.likeCounts}
              </small>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
