import React from "react";
import "./App.css";
import { SolvingPage } from "../features/SolvingPage/SolvingPage";
import { Routes, Route } from "react-router";
import { Header } from "../Header/Header";
import { InitialPage } from "../features/InitialPage/InitialPage";

export const App = () => {
  return (
    <div className="app_wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/solve" element={<SolvingPage />} />
      </Routes>
    </div>
  );
};
