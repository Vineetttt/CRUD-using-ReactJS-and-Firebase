import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/ManageStudent/Home";
import AddStudents from "./pages/AddStudent/AddStudents";
import View from "./pages/ViewStudent/View";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddStudents/>} />
          <Route path="/update/:id" element={<AddStudents />} />
          <Route path="/view/:id" element={<View/>} />
        </Routes>
      </div>
    </BrowserRouter> 
  );
}

export default App;
