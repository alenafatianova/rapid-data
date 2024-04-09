import React, { useEffect, useState } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { BoundingBoxStyle, BoundingBoxType, Coordinate } from "../types/types";


export const BoundingBox: React.FC<BoundingBoxType> = ({
  currentImage,
  setCurrentImage,
  onChange,
  resetTransform,
  setResetTransform,
  isBoxDrawn,
  setIsBoxDrawn
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [bound, setBound] = useState({bottom: 0, left: 0, width: 0, height: 0})

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

  // to be able to draw new rectangle after reseting the previous one
  useEffect(() => {
    if (resetTransform) {
      setIsDrawing(false);
      setIsBoxDrawn(false);
      setStartPosition({ x: 0, y: 0 });
      setEndPosition({ x: 0, y: 0 });
      setBound({bottom: 0, left: 0, width: 0, height: 0});
      setResetTransform && setResetTransform(false); // if setResetTransform, then reset transform value
    }
  }, [resetTransform, setResetTransform, setIsBoxDrawn]);

  const getCursorPosition = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    const point = "touches" in e ? e.touches[0] : e
    return { x: point.clientX, y: point.clientY }
  };


  const absoluteToPercentage = (point: Coordinate) => {
    return {
      x: +((point.x - bound.left) / bound.width * 100).toFixed(4),
      y: +((bound.bottom - point.y) / bound.height * 100).toFixed(4),
    }
  };

  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isBoxDrawn) {
      const position = getCursorPosition(e);

      setIsDrawing(true);
      setStartPosition(position);

      setEndPosition(position);
      setBound(e.currentTarget.getBoundingClientRect())
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const position = getCursorPosition(e);
      setEndPosition(position);
      setIsBoxDrawn(true);
    }
    //e.preventDefault();
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    onChange({
      topLeft: absoluteToPercentage({
        x: Math.min(startPosition.x, endPosition.x),
        y: Math.min(startPosition.y, endPosition.y),
      }),
      bottomRight: absoluteToPercentage({
        x: Math.max(startPosition.x, endPosition.x),
        y: Math.max(startPosition.y, endPosition.y),
      }),
    });
    setIsDrawing(false);
    setIsBoxDrawn(true);
  };

  const boundingBoxStyle: BoundingBoxStyle = {
    left: isBoxDrawn ? Math.min(startPosition.x, endPosition.x) : 0,
    top: isBoxDrawn ? Math.min(startPosition.y, endPosition.y) : 0,
    width: isBoxDrawn ? Math.abs(startPosition.x - endPosition.x) : 0,
    height: isBoxDrawn ? Math.abs(startPosition.y - endPosition.y) : 0,
    resize: isBoxDrawn ? "both" : "none",
    overflow: isBoxDrawn ? "auto" : "hidden",
    opacity: isBoxDrawn ? "unset" : 0
  };

  return (
    <div className="box_image">
    <div
      className="bounding-box_wrapper"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onMouseMove={handleMove} // Only call handleMove when isDrawing is true
      onTouchMove={handleMove} // Only call handleMove when isDrawing is true
      onTouchEnd={handleEnd}
    >
      <div className="bounding-box" style={boundingBoxStyle} />
      
        <img src={currentImage?.path} alt="Car" />
      </div>
    </div>
  );
};
