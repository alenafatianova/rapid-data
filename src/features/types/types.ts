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

export interface BodyRequestType {
  id: string,
	boundingBox: {
		topLeft: {
			x: number,
			y: number,
		},
		bottomRight: {
			x: number
			y: number
		}
	}
}

export interface Coordinate {
	x: number,
	y: number,
}
