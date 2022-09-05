import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
export default function Userhome() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fw-bold">User Home </span>
          <button
           className="btn btn-outline-primary ms-auto  rounded  border border-light"
          
            type="button"
            onClick={logoutUser}
          >
            logout
          </button>
        </div>
      </nav>

      <section id="hero" className="hero d-flex align-items-center ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h1>We offer modern solutions for growing your business</h1>
              <h2>
                We are team of talented designers making websites with Bootstrap
              </h2>
            </div>
            <div className="col-lg-6 hero-img ">
              <img
                src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
