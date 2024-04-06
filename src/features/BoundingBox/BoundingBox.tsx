import React, { useEffect, useState } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { CarsType } from "../types/types";

interface BoundingBoxType {
  currentImage: CarsType;
  setCurrentImage: (currentImage: CarsType) => void;
  onChange: (coordinates: {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  }) => void;
  resetTransform: boolean;
  setResetTransform?: (resetTransform: boolean) => void;
}

interface BoundingBoxStyle {
  left: number;
  top: number;
  width: number;
  height: number | string;
  resize?: "both" | "none";
  overflow?: "auto" | "hidden";
  position?: "static" | "relative";
}

export const BoundingBox: React.FC<BoundingBoxType> = ({
  currentImage,
  setCurrentImage,
  onChange,
  resetTransform,
  setResetTransform,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [isBoxDrawn, setIsBoxDrawn] = useState(false);

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
      setResetTransform && setResetTransform(false); // if setResetTransform, then reset transform value
    }
  }, [resetTransform, setResetTransform]);

  const getCursorPosition = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };

  const handleStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDrawing(true);
    const position = getCursorPosition(e);
    setStartPosition(position);
  };

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (isDrawing) {
      const position = getCursorPosition(e);
      setEndPosition(position);
    }
    e.preventDefault();
    setIsBoxDrawn(true);
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    onChange({
      topLeft: {
        x: Math.min(startPosition.x, endPosition.x),
        y: Math.min(startPosition.y, endPosition.y),
      },
      bottomRight: {
        x: Math.max(startPosition.x, endPosition.x),
        y: Math.max(startPosition.y, endPosition.y),
      },
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
  };

  return (
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
      <div className="box_image">
        <img src={currentImage?.path} alt="Car" />
      </div>
    </div>
  );
};
