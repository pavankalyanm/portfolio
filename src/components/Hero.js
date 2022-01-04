import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';
import TypeIt from "typeit-react";


const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./comp.json'),
    });
    animate.setSpeed(0.5);
  }, []);

  return (
    <section >
      <div class="row" >
        <div class="column"style={{marginTop:"20%"}}>
         
          <h1 className='text-5xl font-bold md:text-7xl'>Hi There ! <br></br>I’m Pavan</h1>
          <br></br><h3>DEVELOPER | AI & ML ENTHUSIAST</h3>
         
        
          
  </div>
        <div class="column">
        <div className='container' ref={container}></div>
        </div>
        
      </div>
      <div style={{marinTop:"100px"}}>

     
      
          </div>
    </section>
  );
};

export default Hero;
