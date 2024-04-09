export interface CarsType {
  id: string;
  fileName: string;
  path: string;
  target: string;
}

export interface ButtonType {
  className?: string;
  children: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface BodyRequestType {
  id: string;
  boundingBox: BoxParamsType | null;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface BoxParamsType {
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

export interface ResponseObjType {
  id: string;
  boundingBox: BoxParamsType | null;
}


export interface BoundingBoxStyle {
  left: number;
  top: number;
  width: number;
  height: number | string;
  resize?: "both" | "none";
  overflow?: "auto" | "hidden";
  position?: "static" | "relative";
  opacity: string | number
}

export interface BoundingBoxType {
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