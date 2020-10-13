import React from "react";

// STYLING
import { HomePage } from "../styles/homeStyling";
import image from "../images/jonathan-borba-Xohjz2UBxgU-unsplash.jpg";
import image2 from "../images/jason-leung-poI7DelFiVA-unsplash.jpg";

const Home = (props) => {
  return (
    <HomePage id="hello-world">
      <img src={image2} />
      <div id="palette">
        <div className="box one">#1e1d46</div>
        <div className="box two">#0f838b</div>
        <div className="box three">#0a6f71</div>
        <div className="box four">#f3c911</div>
        <div className="box five">#f6bc0d</div>
        <div className="box six">#e6e5d1</div>
      </div>
    </HomePage>
  );
};

export default Home;
