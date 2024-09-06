import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroSlider({ geistSpaceGrotesk }) {
    const comp = useRef(null);

    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline();
        t1.from('#intro-slider', {
          xPercent: '-100',
          duration: 1.3,
          delay: .3
        }).from(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: '+=30',
          stagger: .5
        }).to(['#title-1', '#title-2', '#title-3'], {
          opacity: 0,
          y: '-=30',
          delay: .3,
          stagger: .5 // allows each animation in the array to have a slight delay from one another
        }).to('#intro-slider', {
          xPercent: '-100',
          duration: 1.3
        }).from('#welcome', {
          opacity: 0,
          duration: .5
        })
      }, comp);
      return () => ctx.revert();
    });
    return (
        <div className="relative" ref={comp}>
            <div 
              id="intro-slider"
              className={`
                h-screen p-10 bg-gray-50 absolute top-0 left-0
                --font-space-grotesk z-10 w-full flex flex-col 
                gap-10 tracking-tight`}>
              <h1 id="title-1" className="text-9xl font-bold">Software Engineer</h1>
              <h1 id="title-2" className="text-9xl font-bold">Designer</h1>
              <h1 id="title-3" className="text-9xl font-bold">Freelanser</h1>
            </div>
            <div className={`${geistSpaceGrotesk.variable} h-screen flex bg-gray-950 justify-center place-items-center`}>
              <h1 id="welcome" className="text-9xl font-bold text-gray-100 --font-space-grotesk">Daniel Ehrlich.</h1>
            </div>
            <div className="top-screen h-screen left-0 bg-red-50 relative"> 
        </div>
      </div>
    );
}