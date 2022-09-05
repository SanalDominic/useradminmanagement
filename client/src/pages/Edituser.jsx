import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Edituser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setName(state.data.name);
      setEmail(state.data.email);
    }
  }, []);

  const editUser = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/admin/edituser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: state.data._id,
        name: name,
        email: email,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      navigate("/admin");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="container pt-5 text-center">
        <h3 className="fw-bold">Update User</h3>
        <div className="d-flex text-start justify-content-center">
          <form onSubmit={editUser}>
            <input
              className="form-control mb-3"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              required
            />

            <input
              className="form-control mb-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required

            />

            <button type="submit" className="btn btn-success btn-sm">
              Update User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
