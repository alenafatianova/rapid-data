import React, { useEffect, useState } from "react";
import "./BoundingBox.css";
import { getObjectAfterDelay } from "../../api/getObject";
import { CarsType } from "../types/types";

interface BoundingBoxType {
  currentImage: CarsType;
  setCurrentImage: (currentImage: CarsType) => void;
}

export const BoundingBox: React.FC<BoundingBoxType> = ({
  currentImage,
  setCurrentImage,
}) => {
  const [position, setPosition] = useState({ x: 100, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
    if (isResizing) {
      handleResize(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResize = (e: { movementX: number; movementY: number }) => {
    const newWidth = size.width + e.movementX;
    const newHeight = size.height + e.movementY;

    if (newWidth > 0 && newHeight > 0) {
      setSize({
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsResizing(true);
  };


  return (
    <div
      className="bounding-box_wrapper"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="box_image">
        <img src={currentImage?.path} alt="Car" />
      </div>
      <div
        className="bounding-box"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        onMouseDown={handleMouseDown}
      />
      <div
        className="resize-handle"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};
