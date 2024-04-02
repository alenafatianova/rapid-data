import React, { useEffect, useState, useRef } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { CarsType } from "../types/types";

interface BoundingBoxType {
  currentImage: CarsType, 
  setCurrentImage: (currentImage: CarsType) => void
}

export const BoundingBox: React.FC<BoundingBoxType> = ({currentImage, setCurrentImage}) => {


  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await getObjectAfterDelay();
        setCurrentImage(image);
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    };
    getImage();
  }, []);

 
  return (
    <div className="bounding-box_wrapper">
      <div className="box_image">
        <img src={currentImage?.path} alt="Car" />
      </div> 
    </div>
  );
};
