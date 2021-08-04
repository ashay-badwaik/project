import React, { useState } from "react";
import "./../styles/slider.css";
import RightComponent from "./rightComponent";

const Slider = () => {
  const [first, setFirst] = useState(true);

  return (
    <>
      <div id="slider">
        <RightComponent />
        <div onClick={() => setFirst(!first)} className="next" data-testid='next-btn'></div>
        <div className={first ? "slide slide1" : "slide slide2"}>
          <div className="first" data-testid='first'></div>
          <div className="second" data-testid='second'></div>
        </div>
      </div>
    </>
  );
};

export default Slider;
