import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { login } from "./validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
      navigate("/", { replace: true });
    }

    if (Object.keys(errors).length === 0 && validated) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/home";
    } else {
      setLoginError(true);
    }
  };

  const loginUser = (event) => {
    event.preventDefault();
    setErrors(login(email, password));
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
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form
                    onSubmit={loginUser}
                    className="needs-validation"
                    autoComplete="off"
                  >
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
                        autoFocus
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label
                          className={
                            !errors.password ? "text-muted" : "text-danger"
                          }
                          htmlFor="password"
                        >
                          {!errors.password ? "Password" : `${errors.password}`}
                        </label>
                      </div>
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>
                    {loginError && (
                      <label className="text-danger">
                        Invalid Credentials !
                      </label>
                    )}

                    <div className="d-flex align-items-center">
                      <button
                        type="submit"
                        className="btn btn-primary ms-auto  rounded"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?
                    <a href="/register" className="text-dark">
                      Create One
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
