import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";

//interactivity: {
//   events: {
//     onhover: {
//       enable: true,
//       mode: "repulse",
//     },
//   },
// },
const particlesOptions = {
  particles: {
    number: {
      value: 75,
    },
    size: {
      value: 10,
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
    },
  },
};

function App() {
  const [inputState, setInputState] = React.useState("");
  const [ImageUrlState, setImageUrlState] = React.useState("");
  const [BoxState, setBoxState] = React.useState({});

  const app = new Clarifai.App({
    apiKey: "5711a75e17154982bcb5f87c8bda9747",
  });
  const boxCalculation = (resp) => {
    const clarifaiFace =
      resp.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayBox = (box) => {
    setBoxState(box);
    console.log(box);
  };
  const handleInputChange = function (event) {
    //console.log(event.target.value);
    setInputState(event.target.value);
  };
  const handleBtnSubmit = function () {
    setImageUrlState(inputState);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, inputState)
      .then((response) => displayBox(boxCalculation(response)))
      .catch((err) => console.log("error!"));
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Rank />
      <ImageLinkForm
        onChange={handleInputChange}
        handleBtnSubmit={handleBtnSubmit}
      />
      <FaceRecognition box={BoxState} picUrl={ImageUrlState} />
    </div>
  );
}

export default App;
