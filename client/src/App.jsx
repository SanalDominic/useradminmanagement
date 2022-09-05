import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Userhome from "./pages/Userhome";
import Adminlogin from "./pages/Adminlogin";
import Adminhome from "./pages/Adminhome";
import Adduser from "./pages/Adduser";
import Edituser from "./pages/Edituser";
import Nopage from "./pages/Nopage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/home" exact element={<Userhome />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/dashboard" element={<Adminhome />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}
