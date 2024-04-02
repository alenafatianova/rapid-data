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

  const handleMouseMove = (e: {
    clientX?: any;
    clientY?: any;
    touches?: any;
    movementX?: number;
    movementY?: number;
  }) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
    if (isResizing) {
      handleResize(e.touches);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResize = (e: {
    touches: any[] | any;
    movementX: number;
    movementY: number;
  }) => {
    const newWidth = size.width + e.movementX;
    const newHeight = size.height + e.movementY;

    if (newWidth > 0 && newHeight > 0) {
      const touch = e.touches[0];
      if (touch) {
        setSize({
          width: touch.clientX - position.x,
          height: touch.clientY - position.y,
        });
      }
    }
  };

  const handleResizeStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      if (touch) {
        setPosition({
          x: touch.clientX - dragOffset.x,
          y: touch.clientY - dragOffset.y,
        });
      }
    }

    if (isResizing) {
      const touch = e.touches[0];
      if (touch) {
        handleResize({
          touches: e.touches,
          movementX: touch.clientX - dragOffset.x,
          movementY: touch.clientY - dragOffset.y,
        });
      }
    }
  };

  return (
    <div
      className="bounding-box_wrapper"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
        onTouchStart={handleResizeStart}
      />
    </div>
  );
};
