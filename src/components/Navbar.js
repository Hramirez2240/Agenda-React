import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authorization/authorizationContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { authenticate, user, signOut } = authContext;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-#1a304e" style={{background: "#14253D", position: "sticky", top: "1px"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Proyecto Agenda
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {authenticate && (
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
            )}
          </ul>
          {user ? (
            <Fragment>
              <span className="navbar-text">
                <Link className="nav-link" to={"/user"}>
                  {user.name}
                </Link>
              </span>
              <span className="navbar-text">
                <Link className="nav-link" onClick={() => signOut()} to="#">
                  Sign Out
                </Link>
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <span className="navbar-text">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;