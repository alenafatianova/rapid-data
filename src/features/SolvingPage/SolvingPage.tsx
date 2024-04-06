import React, { useState } from "react";
import "./SolvingPage.css";
import { BoundingBox } from "../BoundingBox/BoundingBox";
import { Button } from "../Button/Button";
import { CarsType, ResponseObjType } from "../types/types";
import vid_4_600 from "../../assets/data/vid_4_600.jpg";
import { postObject } from "../../api/setObject";
import { useNavigate } from "react-router";
import throttle from "lodash/throttle";

export const SolvingPage = () => {
  const navigate = useNavigate();
  const [isBounded, setIsBounded] = useState(false);
  const [resetTransform, setResetTransform] = useState(false);

  const [currentImage, setCurrentImage] = useState<CarsType>({
    id: "1",
    path: vid_4_600,
    fileName: "vid_4_600.jpg",
    target: "car",
  });

  const [responseObj, setResponseObj] = useState<ResponseObjType>({
    id: currentImage.id,
    boundingBox: null,
  });

  const submitHandler = () => {
    if (isBounded) {
      setTimeout(async () => {
        try {
          await postObject(responseObj);
          console.log("Guess was submitted!", responseObj);
          navigate("/thankyou");
        } catch (err) {
          console.log("Error while submiting: ", err);
          throw new Error();
        }
      }, 1000);
    }
  };

  const trottleSubnitHandler = throttle(submitHandler, 2000);

  const noCarHandler = () => {
    !isBounded && console.log("There is no car on the image!");
  };

  const handleBoundingBoxChange = (coordinates: {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  }) => {
    setIsBounded(true);
    setResponseObj({
      id: currentImage.id,
      boundingBox: coordinates,
    });
  };

  const handleDeleteBox = () => {
    setIsBounded(false);
    setResetTransform(true);
    setTimeout(() => setResetTransform(false), 3000);
  };

  return (
    <div className="solving-page_wrapper">
      <div className="solving-page_banner">
        <p className="banner_text">
          Do you see a car? Drag a rectangle over it!
        </p>
      </div>
      <BoundingBox
        resetTransform={resetTransform}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        onChange={() => handleBoundingBoxChange}
      />
      <div className="solving-page_buttons">
        <Button
          disabled={!isBounded}
          className="submit_button"
          onClick={trottleSubnitHandler}
        >
          Submit
        </Button>
        <Button className="delete-box" onClick={handleDeleteBox}>
          Delete the box
        </Button>
        <Button className="no-car_button" onClick={noCarHandler}>
          No car on the image
        </Button>
      </div>
    </div>
  );
};
