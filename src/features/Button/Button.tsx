import React from "react";
import "./Button.css";
import { ButtonType } from "../types/types";

export const Button: React.FC<ButtonType> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <React.Fragment>
      <button
        className={className}
        style={{
          color: "#2874ed",
          border: "#2874ed 2px solid",
          borderRadius: "5px",
          opacity: "0.9",
          padding: "5px",
          cursor: "pointer",
          fontFamily: "Red Hat Display, sans-serif",
          minWidth: "120px",
          marginTop: "50px",
          backgroundColor: "white",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </React.Fragment>
  );
};
