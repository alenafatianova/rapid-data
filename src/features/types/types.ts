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
  boundingBox: BoxParamsType | null
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

export interface BoundingBoxType {
  currentImage: CarsType;
  setCurrentImage: (currentImage: CarsType) => void;
  onChange: (coordinates: { topLeft: { x: number; y: number }; bottomRight: { x: number; y: number }}) => void;
  className?: string
  resetTransform: boolean
}
