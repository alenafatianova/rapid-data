import React, { useEffect, useState } from "react";
import "./SolvingPage.css";
import { BoundingBox } from "../BoundingBox/BoundingBox";
import { Button } from "../Button/Button";
import { CarsType, ResponseObjType } from "../types/types";
import { postObject } from "../../api/setObject";
import { useNavigate } from "react-router";
import throttle from "lodash/throttle";
import { PopupForm } from "../PopupForm/PopupForm";
import { cars } from "./utils";

export const SolvingPage = () => {
  const navigate = useNavigate();
  const [isBounded, setIsBounded] = useState(false);
  const [resetTransform, setResetTransform] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isBoxDrawn, setIsBoxDrawn] = useState(false);
  const [currentImage, setCurrentImage] = useState<CarsType | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  // state to track how many images were shown
  const [imagesShown, setImagesShown] = useState(0);

  const [responseObj, setResponseObj] = useState<ResponseObjType>({
    id: cars[imageIndex].id,
    boundingBox: null,
  });

  useEffect(() => {
    const randomCar = cars[Math.floor(Math.random() * cars.length)];
    setCurrentImage(randomCar);
  }, []);

  const submitHandler = () => {
    if (isBounded) {
      setTimeout(async () => {
        try {
          await postObject(responseObj);
          console.log("Guess was submitted!", responseObj);
          if (imageIndex < 2) {
            setImageIndex(imageIndex + 1);
          } else {
            setPopupOpen(true);
          }
          setImagesShown(imagesShown + 1);
          // Set a new random image
          const randomCar = cars[Math.floor(Math.random() * cars.length)];
          setCurrentImage(randomCar);
          // reset the box
          setIsBounded(false);
          // wait 3 seconds and after allows user to draw another box
          setResetTransform(true);
          setTimeout(() => setResetTransform(false), 1000);
          setIsBoxDrawn(false);
        } catch (err) {
          console.log("Error while submitting: ", err);
          throw new Error();
        }
      }, 1000);
    }
  };

  const trottleSubnitHandler = throttle(submitHandler, 2000);


  const noCarHandler = () => {
  
      !isBounded && console.log("There is no car on the image!");
      const randomCar = cars[Math.floor(Math.random() * cars.length)];
      setCurrentImage(randomCar)
    
  };

  const handleBoundingBoxChange = (coordinates: {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  }) => {
    setIsBounded(true);
    setResponseObj({
      id: cars[imageIndex].id,
      boundingBox: coordinates,
    });
  };

  const handleDeleteBox = () => {
    setIsBounded(false);
    setResetTransform(true);
    setTimeout(() => setResetTransform(false), 3000);
  };

  const handleContinue = () => {
    setPopupOpen(false);
    setImageIndex(0);
    setImagesShown(0);
    setResetTransform(true);
    setIsBounded(false);
    // Set a new random image after clicking "Continue"
    const randomCar = cars[Math.floor(Math.random() * cars.length)];
    setCurrentImage(randomCar);
  };

  const handleBackToMainPage = () => {
    setPopupOpen(false);
    navigate("/thankyou");
  };


  return (
    <div className="solving-page_wrapper">
      <div className="solving-page_banner">
        <p className="banner_text">
          Do you see a car? Draw a rectangle over it!
        </p>
      </div>
      {currentImage && (
        <BoundingBox
          resetTransform={resetTransform}
          currentImage={currentImage}
          isBoxDrawn={isBoxDrawn}
          setIsBoxDrawn={setIsBoxDrawn}
          setCurrentImage={setCurrentImage}
          onChange={handleBoundingBoxChange}
        />
      )}

      <div className="solving-page_buttons">
        <Button
          disabled={!isBounded && !isBoxDrawn}
          className="submit_button"
          onClick={trottleSubnitHandler}
        >
          Submit
        </Button>
        <Button disabled={!isBounded} className="delete-box" onClick={handleDeleteBox}>
          Delete the box
        </Button>
        <Button className="no-car_button" onClick={noCarHandler}>
          No car on the image
        </Button>
      </div>
      <PopupForm
        handleContinue={handleContinue}
        handleBackToMainPage={handleBackToMainPage}
        open={popupOpen}
        setOpen={setPopupOpen}
      />
    </div>
  );
};