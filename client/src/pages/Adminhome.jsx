import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "../style.css";
export default function Adminhome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const reqUserData = async () => {
    const response = await fetch("http://localhost:4000/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUsers(data);
  };

  let index = 0;
  const deleteUser = useCallback(async (id) => {
    if (window.confirm("Do you really want to delete your profile?")) {
      await fetch("http://localhost:4000/admin/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    } else {
      window.location.href = "/dashboard";
    }
  });

  const logoutAdmin = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("admintoken");

    if (token) {
      const admin = decodeToken(token);

      if (!admin) {
        localStorage.removeItem("admintoken");
        navigate("/admin", { replace: true });
      }
    } else {
      navigate("/admin", { replace: true });
    }

    reqUserData();
  }, [deleteUser]);

  return (
    <>
      <div className="container py-5">
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 fw-bold">Admin Home </span>
            <button
              className="btn btn-outline-primary ms-auto  rounded  border border-light"
              type="button"
              onClick={logoutAdmin}
            >
              logout
            </button>
          </div>
        </nav>

        <div className="d-flex mt-5 ">
          <button
            className="btn  btn-dark  rounded ms-auto"
            onClick={() => navigate("/adduser")}
          >
            Add User
          </button>
         
        </div>
        <div>

        <table className="table  table-borderless table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.userData.map((data) => {
                index++;
                return (
                  <tr key={data._id}>
                    <td>{index}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm rounded"
                        onClick={() =>
                          navigate("/edituser", { state: { data } })
                        }
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm rounded"
                        onClick={() => deleteUser(data._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
