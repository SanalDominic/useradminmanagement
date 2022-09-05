import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Adduser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function addUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      navigate("/dashboard", { push: true });
    }
  }

  return (
    <div className="container pt-5 text-center">
      <h3 className="fw-bold">Add New User</h3>
      <div className="d-flex text-start justify-content-center">
        <form onSubmit={addUser}>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            required

          />
          <br />
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required

          />
          <br />
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required

          />
          <br />
          <button type="submit" className="btn btn-success btn-sm">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
