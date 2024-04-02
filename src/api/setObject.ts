import { BodyRequestType } from "../features/types/types";

export const postObject = async (responseObj: BodyRequestType): Promise<void> => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(responseObj),
  };
  setTimeout(() => {
    return requestOptions;
  }, 300);

  console.log("The guess is submitted!");
};
