import React, {useEffect, useState} from "react";
import "./SolvingPage.css";
import { BoundingBox } from "../BoundingBox/BoundingBox";
import { Button } from "../Button/Button";
import { CarsType, Coordinate } from "../types/types";
import vid_4_600 from '../../assets/data/vid_4_600.jpg'
import { postObject } from "../../api/setObject";
import { useNavigate } from "react-router";

export const SolvingPage = () => {

  const [isBounded, setIsBounded] = useState(false)
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState<CarsType>({ id: '1',
  path: vid_4_600,
  fileName: 'vid_4_600.jpg',
  target: 'car'});
  
  const [topLeft, setTopLeft] = useState<Coordinate>({x: 0, y: 0})
  const [bottomRight, setbottomRight] = useState<Coordinate>({x: 100, y: 100})
  const responseObj = {
    id: currentImage.id,
    boundingBox: {
      topLeft: topLeft,
      bottomRight: bottomRight
    }
  }

  
  const submitHandler = () => {
    setTimeout(async () => {
      await postObject(responseObj)
      console.log('Guess was submitted!', responseObj)
      navigate("/thankyou");
    }, 3000)
    
  }

  const cancelHandler = () => {
    setIsBounded(false)
    setTopLeft({x: 0, y: 0})
    setbottomRight({x: 0, y: 0})
  }


  const noCarHandler = () => {
    console.log('There is no car on the image!')
  }
  
  return (
    <div className="solving-page_wrapper">
      <div className="solving-page_banner">
        <p className="banner_text">
          Do you see a car? Drag a rectangle over it!
        </p>
      </div>
      <BoundingBox currentImage={currentImage} setCurrentImage={setCurrentImage} />
      <div className='solving-page_buttons'>
        <Button className='submit_button' onClick={submitHandler}>Submit</Button>
        <Button className='cancel_button' onClick={cancelHandler}>Cancel</Button>
        <Button className='no-car_button' onClick={noCarHandler}>No car on the image</Button>
      </div>
    </div>
  );
};
