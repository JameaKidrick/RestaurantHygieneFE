import React from "react";

// STYLING
import { HomePage } from "../styles/homeStyling";
import image1 from "../images/jonathan-borba-Xohjz2UBxgU-unsplash.jpg";
import image2 from "../images/jason-leung-poI7DelFiVA-unsplash.jpg";
import image3 from '../images/david-emrich-50cY-AXxNF8-unsplash.jpg';
import image4 from '../images/jeremy-stenuit-3mErKfgolzM-unsplash.jpg';
import image5 from '../images/miikka-luotio-UQ_ceCisv_w-unsplash.jpg';
import image6 from '../images/kissclipart-restaurant-clipart-restaurant-la-terrasse-indian-c-7db9e949989da191.png';
import image7 from '../images/Demo.png';
import image8 from '../images/Demo(2).png';

const Home = (props) => {
  return (
    <HomePage>
      {/* <img src={image1} style={{height:'40rem', width:'40rem', marginTop:'3rem', marginLeft:'5rem'}} /> */}
      {/* <img src={image2} />
      <img src={image3} />
      <img src={image4} />
      <img src={image5} /> */}
      <div className='container'>
        <img src={image6} />
        <div className='marketingContent'>
          <p id='header'>Welcome to Restaurant Hygiene!</p>
          <div>But we’ve met before. That was a long time ago, I was a kid at St. Swithin’s, It used to be funded by the Wayne Foundation. It’s an orphanage. My mum died when I was small, it was a car accident. I don’t remember it. My dad got shot a couple of years later for a gambling debt. Oh I remember that one just fine. Not a lot of people know what it feels like to be angry in your bones. I mean they understand. The fosters parents. Everybody understands, for a while. Then they want the angry little kid to do something he knows he can’t do, move on. After a while they stop understanding. They send the angry kid to a boy’s home, I figured it out too late. Yeah I learned to hide the anger, and practice smiling in the mirror. It’s like putting on a mask. So you showed up this one day, in a cool car, pretty girl on your arm. We were so excited! Bruce Wayne, a billionaire orphan? We used to make up stories about you man, legends and you know with the other kids, that’s all it was, just stories, but right when I saw you, I knew who you really were. I’d seen that look on your face before. It’s the same one I taught myself. I don’t why you took the fault for Dent’s murder but I’m still a believer in the Batman. Even if you’re not…
          </div>
          {!localStorage.getItem('token') && (
            <div className='buttonContainer'>
              <button>Sign In</button>
              <button>Register</button>
            </div>
          )}
        </div>
      </div>
      <img className='demo first' src={image7} />
      {/* <img className='demo second' src={image8} /> */}
    </HomePage>
  );
};

export default Home;
