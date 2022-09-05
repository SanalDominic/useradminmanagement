import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { register } from "./validation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } else {
      navigate("/register", { replace: true });
    }

    if (Object.keys(errors).length === 0 && validated) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = async () => {
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
      navigate("/", { push: true });
    }
  };

  const registerUser = (event) => {
    event.preventDefault();
    setErrors(register(name, email, password));
    setValidated(true);
  };

  return (
    <>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <form
                    onSubmit={registerUser}
                    className="needs-validation"
                    autoComplete="off"
                  >
                    <div className="mb-3">
                      <label
                        className={!errors.name ? "text-muted" : "text-danger"}
                        htmlFor="name"
                      >
                        {!errors.name ? "Name" : `${errors.name}`}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className={!errors.email ? "text-muted" : "text-danger"}
                        htmlFor="email"
                      >
                        {!errors.email ? "E-Mail Address" : `${errors.email}`}
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className={
                          !errors.password ? "text-muted" : "text-danger"
                        }
                        htmlFor="password"
                      >
                        {!errors.password ? "Password" : `${errors.password}`}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="align-items-center d-flex">
                      <button
                        type="submit"
                        className="btn btn-primary ms-auto rounded"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account?{" "}
                    <a href="/" className="text-dark">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
