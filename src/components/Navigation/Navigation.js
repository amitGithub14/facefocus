import React from "react";
import Logo from "../Logo/Logo";
import "tachyons";
import "./Navigation.css";

const Navigation = ({ onRouteChange, logStatus }) => {
  if (logStatus === "home") {
    return (
      <nav>
        <Logo />
        <div className="logInfo">
          <p
            onClick={() => onRouteChange("signout")}
            className="f3 link black underline pa4 pointer"
          >
            Logout
          </p>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <Logo />
        <div className="logInfo">
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link black underline pa4 pointer"
          >
            SignIn
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link black underline pa4 pointer"
          >
            Register
          </p>
        </div>
      </nav>
    );
  }
};

export default Navigation;
