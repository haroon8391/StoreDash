import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ height: "9.5 vh" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand" style={{ marginRight: "35px" }}>
            StoreDash
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/add">
                      Add
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/update/:id">
                      Update
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/profile">
                      {JSON.parse(auth).name}
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="d-flex">
                      <Link className="nav-link active me-2" to="/signup">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="d-flex">
                      <Link className="nav-link active" to="/signUp">
                        <button type="button" className="btn btn-success">
                          SignUp
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="d-flex">
                      <Link className="nav-link active" to="/login">
                        <button type="button" className="btn btn-success">
                          Login
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
