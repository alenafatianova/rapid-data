import React from "react";
import "./Button.css";
import { ButtonType } from "../types/types";

export const Button: React.FC<ButtonType> = ({
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <React.Fragment>
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </React.Fragment>
  );
};
