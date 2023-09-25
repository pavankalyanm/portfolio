import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';




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
    <section style={{marginTop:"50px"}}>
      <div class="row" >
        <div class="column"style={{marginTop:"20%"}}>
         
          <h1 className='text-5xl font-bold md:text-7xl'>Hi There ! <br></br>I’m Pavan Kalyan</h1>
          <br></br><h3>DEVELOPER | AI & ML ENTHUSIAST</h3>
          <br></br>
          <br></br>
          <br></br>
          
          
          <div className='w-auto flex space-x-5 relative' >
                  <a href="https://github.com/pavankalyanm" target='_blank' rel='noreferrer'>
                    <img src='./images/icons/github.svg' alt='link to github page' width='24px' height='24px' />
                  </a>
                  <a href="https://www.linkedin.com/in/pavan-kalyan-048215164/" target='_blank' rel='noreferrer'>
                    <img src='./images/icons/linkedin.svg' alt='link to linkedin' width='24px' height='24px' />
                  </a>
        </div>
          
  </div>
        <div class="column">
        <div className='container' ref={container}></div>
        </div>
        
      </div>
      
      
        
    </section>
  );
};

export default Hero;
