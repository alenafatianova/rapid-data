import React, { useEffect, useRef, useState } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { CarsType } from "../types/types";
import { Resizable } from "re-resizable";

interface BoundingBoxType {
  currentImage: CarsType;
  setCurrentImage: (currentImage: CarsType) => void;
  onChange: (coordinates: {
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  }) => void;
  resetTransform: boolean;
  setResetTransform?: (resetTransform: boolean) => void;
  isBoxDrawn: boolean
  setIsBoxDrawn: (isBoxDrawn: boolean) => void
}

interface BoundingBoxStyle {
  left: number;
  top: number;
  width: number;
  height: number | string;
  resize?: "both" | "none";
  overflow?: "auto" | "hidden";
  position?: "static" | "relative"
}

export const BoundingBox: React.FC<BoundingBoxType> = ({
  currentImage,  
  isBoxDrawn,
  resetTransform,
  setCurrentImage,
  onChange,
  setResetTransform,
  setIsBoxDrawn
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  

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
      setResetTransform && setResetTransform(false);
    }
  }, [resetTransform, setResetTransform, setIsBoxDrawn]);

console.log('resetTransform:', resetTransform)

  const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const position = getCursorPosition(e);
    
    setIsDrawing(true);
    setStartPosition(position);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const position = getCursorPosition(e);
      setEndPosition(position);
      setIsBoxDrawn(true);
    }
    e.preventDefault();
   
    
  };

  const handleEnd = () => {
    if (!isDrawing) return;
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

  const getCursorPosition = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };

  const boundingBoxStyle: BoundingBoxStyle = {
    left: isBoxDrawn ? Math.min(startPosition.x, endPosition.x) : 0,
    top: isBoxDrawn ? Math.min(startPosition.y, endPosition.y) : 0,
    width: isBoxDrawn ?  Math.abs(startPosition.x - endPosition.x) : 0,
    height: isBoxDrawn ? Math.abs(startPosition.y - endPosition.y) : 0,
    resize: isBoxDrawn ? "both" : "none",
    overflow: isBoxDrawn ? "auto" : "hidden",
    
  };

console.log('isBoxDrawn:', isBoxDrawn)

  return (
    <div
      className="bounding-box_wrapper"
      onMouseDown={handleStart}
      onTouchMove={handleMove} // Only call handleMove when isDrawing is true
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onMouseMove={handleMove} // Only call handleMove when isDrawing is true
      onTouchEnd={handleEnd}
    >
      <div className={"bounding-box"} style={boundingBoxStyle}>
        <Resizable
          defaultSize={{
            width: boundingBoxStyle.width,
            height: boundingBoxStyle.height,
          }}
          // style={{ position: isBoxDrawn ?  "static" : "relative"}}
        
        />
      </div>

      <div className="box_image">
        <img src={currentImage?.path} alt="Car" />
      </div>
    </div>
  );
};
