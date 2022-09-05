import React from "react";
import { useNavigate } from "react-router-dom";
export default function Nopage() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home", { replace: true });
  };

  return (
    <>
      <h1>404 page not found</h1>
    
    </>
  );
}
