import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div id="navigation">
        <Link to="/" className="logo-container"></Link>
        <div className="navlinks-container">
          <Link to="/">
            <i class="fa-solid fa-gear"></i>
          </Link>
          <Link to="/dashboard">
            <i class="fa-solid fa-house"></i>
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
