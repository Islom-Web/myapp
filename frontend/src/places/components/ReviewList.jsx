import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ReviewItem from "./ReviewItem.jsx";
import Button from "../../shared/components/FormElements/Button";
import "./ReviewList.css";

const ReviewList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No reviews found. Maybe create one?</h2>
          <Button to="/places/new">Share Review</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <ReviewItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          onDelete={props.onDeletePlace}
        ></ReviewItem>
      ))}
    </ul>
  );
};

export default ReviewList;
