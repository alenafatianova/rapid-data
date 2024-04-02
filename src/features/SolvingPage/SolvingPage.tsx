import React from "react";
import "./SolvingPage.css";
import { BoundingBox } from "../BoundingBox/BoundingBox";

export const SolvingPage = () => {
  return (
    <div className="solving-page_wrapper">
      <div className="solving-page_banner">
        <p className="banner_text">
          Do you see a car? Drag a rectangle over it!
        </p>
      </div>
      <BoundingBox />
    </div>
  );
};
