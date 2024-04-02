import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./ThankYouPage.css";

export const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div className="thankyou-page_wrapper">
      <div className="text-container">
        <p>Thank you for solving a quizz!</p>
        <p>We hope that you had fun</p>
      </div>

      <div className="redirect-container">
        <p>You'll be redirected on main page in 5 seconds</p>
      </div>
    </div>
  );
};
