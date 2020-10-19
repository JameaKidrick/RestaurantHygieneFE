import React from "react";

// STYLING
import { HomePage } from "../styles/homeStyling";
import image from '../images/kissclipart-restaurant-clipart-restaurant-la-terrasse-indian-c-7db9e949989da191.png';

const Home = (props) => {
  return (
    <HomePage>
      <div className='container'>
        <img src={image} />
        <div className='marketingContent'>
          <p id='header'>Welcome to Restaurant Hygiene!</p>
          <div>Restaurant Hygiene lets you rate a restaurant and leave a review on its hygiene level. You'll be able to see other users' reviews and decide where you'll order your next meal!</div>
        </div>
      </div>
    </HomePage>
  );
};

export default Home;
