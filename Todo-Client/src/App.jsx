import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Project from "./Pages/Project";
import Auth from "./Pages/Auth";
import Header from "./components/Header";
import Todo from "./Pages/Todo";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Database from "./Pages/Database";
import ProjectSummary from "./Pages/ProjectSummary";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route path="/database" element={<Database />} />
          <Route path="/project-summary/:id" element={<ProjectSummary />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
