import React from "react";
import "tachyons";
import "./FaceRecognition.css";

const FaceRecognition = ({ picUrl, box }) => {
  return (
    <div className="center">
      <div className=" mt2" style={{ position: "relative" }}>
        <img
          id="inputImage"
          src={picUrl}
          alt="face recognition"
          width="400px"
          height="auto"
        />
        {box.map((box) => (
          <div
            key={box.topRow}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              left: box.leftCol,
              bottom: box.bottomRow,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
