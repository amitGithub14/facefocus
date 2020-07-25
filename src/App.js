import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

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

const defaultUser = { id: "", name: "", email: "", entries: 0, joined: "" };
const initialBox = [];
const initialImageUrl = "";
const initialInput = "";

function App() {
  const [inputState, setInputState] = React.useState(initialInput);
  const [ImageUrlState, setImageUrlState] = React.useState(initialImageUrl);
  const [BoxState, setBoxState] = React.useState(initialBox);
  const [routeState, setRouteState] = React.useState("signin");
  const [stateUser, setUser] = React.useState(defaultUser);

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: new Date(),
    });
  };

  const boxCalculation = (resp) => {
    const clarifaceArray = resp.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const elArray = [];
    for (const el of clarifaceArray) {
      elArray.push({
        leftCol: el.left_col * width,
        topRow: el.top_row * height,
        rightCol: width - el.right_col * width,
        bottomRow: height - el.bottom_row * height,
      });
    }
    return elArray;
  };
  const displayBox = (box) => setBoxState(box);
  const handleInputChange = function (event) {
    setInputState(event.target.value);
  };
  const handleBtnSubmit = function () {
    setImageUrlState(inputState);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: inputState,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: stateUser.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser({ ...stateUser, entries: count }))
            .catch((err) => console.log("error updating entry!", err));
        }
        displayBox(boxCalculation(response));
      })
      .catch((err) => console.log("error!", err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setBoxState(initialBox);
      setImageUrlState(initialImageUrl);
      setUser(defaultUser);
      setInputState(initialInput);
      setRouteState("signin");
    } else {
      setRouteState(route);
    }
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange} logStatus={routeState} />
      {routeState === "home" ? (
        <>
          <Rank user={stateUser} />
          <ImageLinkForm
            onChange={handleInputChange}
            handleBtnSubmit={handleBtnSubmit}
          />
          <FaceRecognition box={BoxState} picUrl={ImageUrlState} />
        </>
      ) : routeState === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
