import React, { useState } from "react";
import "./SolvingPage.css";
import { BoundingBox } from "../BoundingBox/BoundingBox";
import { Button } from "../Button/Button";
import { CarsType, ResponseObjType } from "../types/types";
import vid_4_600 from "../../assets/data/vid_4_600.jpg";
import vid_4_980 from "../../assets/data/vid_4_980.jpg";
import vid_4_1000 from "../../assets/data/vid_4_1000.jpg";
import { postObject } from "../../api/setObject";
import { useNavigate } from "react-router";
import throttle from "lodash/throttle";

export const SolvingPage = () => {
  const navigate = useNavigate();
  const [isBounded, setIsBounded] = useState(false);
  const [resetTransform, setResetTransform] = useState(false);
  const [imageIndex, setImageIndex] = useState(0)

  const [currentImage, setCurrentImage] = useState<CarsType[]>([
    { id: "1", path: vid_4_600, fileName: "vid_4_600.jpg", target: "car" },
    { id: "2", path: vid_4_980, fileName: "vid_4_980.jpg", target: "car" },
    { id: "3", path: vid_4_1000, fileName: "vid_4_1000.jpg", target: "car" },
  ]);


  const [responseObj, setResponseObj] = useState<ResponseObjType>({
    id: currentImage[imageIndex].id,
    boundingBox: null,
  });

  const submitHandler = () => {
    if (isBounded) {
      setTimeout(async () => {
        try {
          await postObject(responseObj);
          console.log("Guess was submitted!", responseObj);
          if (imageIndex < 2) {
            setImageIndex(imageIndex + 1)
            // reset the box
            setIsBounded(false)
            // wait 3 seconds and after alows user to draw another box
            setResetTransform(true)
            setTimeout(() => setResetTransform(false), 3000);
          } else {
            // Make another page with suggestion to continue the tasks or to go back to initial page
            navigate("/thankyou");
          }

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
      id: currentImage[imageIndex].id,
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
        currentImage={currentImage[imageIndex]}
        setCurrentImage={() => {}}
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
