import React from "react";
import "tachyons";
import Tilt from "react-tilt";
import "./Logo.css";
import smile from "./smile.png";

const Logo = () => {
  return (
    <div className="ma4" style={{ flex: "1 200px" }}>
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <span role="img" aria-label="">
            <img src={smile} alt="logo" style={{ height: 120, width: 120 }} />
          </span>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
