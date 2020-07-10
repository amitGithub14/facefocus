import React from "react";
import Logo from "../Logo/Logo";
import "tachyons";

const Navigation = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
        }}
      >
        <Logo />
        <div
          style={{
            flex: "2 300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{ alignSelf: "flex-end" }}
            className="f3 link black underline pa5 pointer"
          >
            Logout
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
