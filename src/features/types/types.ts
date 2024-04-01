export interface CarsType {
  id: string;
  fileName: string;
  path: string;
  target: string;
}

export interface ButtonType {
  className?: string;
  children: string;
  onClick: () => void;
}
