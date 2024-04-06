import React from "react";
import "./PopupForm.css";
import Popup from "reactjs-popup";
import { Button } from "../Button/Button";

interface PopupType {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleContinue: () => void;
  handleBackToMainPage: () => void;
}

export const PopupForm: React.FC<PopupType> = ({
  open,
  setOpen,
  handleContinue,
  handleBackToMainPage,
}) => {
  return (
    <React.Fragment>
      <Popup
        className="popup_wrapper"
        open={open}
        onOpen={() => setOpen}
        position={"center center"}
      >
        <div className="popup_container">
          <p className="popup_text">Do you want to continue solving task?</p>
          <div className="popup_buttons">
            <Button className="button_continue" onClick={handleContinue}>
              Continue
            </Button>
            <Button className="button_back" onClick={handleBackToMainPage}>
              To main page
            </Button>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};
