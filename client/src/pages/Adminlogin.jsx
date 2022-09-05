import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { login } from "./validation";

export default function Adminlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const adminLogin = (event) => {
    event.preventDefault();
    setErrors(login(email, password));
    setValidated(true);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:4000/admin", {
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

    if (data.admin) {
      localStorage.setItem("admintoken", data.admin);
      window.location.href = "/dashboard";
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("admintoken");
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      navigate("/admin", { replace: true });
    }

    if (Object.keys(errors).length === 0 && validated) {
      handleSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card  shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form
                    onSubmit={adminLogin}
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
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

    // <>
    //   <div
    //     class="d-flex align-items-center"
    //     style={{ height: "100vh", backgroundColor: "#5286F3" }}
    //   >
    //     <div class="simple-login-container">
    //       <h2 class="text-white">Login Form</h2>
    //       <form onSubmit={adminLogin}>
    //         <div class="row mb-4">
    //           <div class="col-md-12 form-group">
    //             <input
    //               className="form-control"
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="email"
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div class="row mb-4">
    //           <div class="col-md-12 form-group">
    //             <input
    //               className="form-control"
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               placeholder="password"
    //               required
    //             />
    //           </div>
    //         </div>
    //         <div class="row">
    //           <div class="col-md-12 form-group">
    //             <button type="submit" className="btn btn-block btn-login w-100">
    //               Login
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </>

    // <div className="container pt-5 text-center">
    //   <h3 className="fw-bold pt-3">Login Here</h3>

    //   <div className="d-flex text-start justify-content-center">
    //     <form onSubmit={adminLogin}>
    //       <input
    //         className="form-control"
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="email"
    //         required

    //       />
    //       <br />
    //       <input
    //         className="form-control"
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="password"
    //         required

    //       />
    //       <br />
    //       <button type="submit" className="btn btn-success btn-sm">
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}
