import React, { useEffect, useState } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { CarsType } from "../types/types";

export const BoundingBox = () => {
  const [currentImage, setCurrentImage] = useState<CarsType>();

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
