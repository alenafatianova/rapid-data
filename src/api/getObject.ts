import { cars } from "../features/SolvingPage/utils";
import { CarsType } from "../features/types/types";

export const getObjectAfterDelay = async (): Promise<CarsType> => {
  return new Promise<CarsType>((resolve) => {
    setTimeout(() => {
      resolve(cars[Math.floor(Math.random() * cars.length)]);
    }, 300);
  });
};
