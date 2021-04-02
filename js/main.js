


gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".container-hero div")
ScrollTrigger.matchMedia({

  // desktop
  "(min-width: 800px)": function() {
    // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
    
    
  
  },
  // mobile
  "(max-width: 799px)": function() {
    // The ScrollTriggers created inside these functions are segregated and get

  },

  // all
  "all": function() {
    console.clear();

    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 520; //No. of Images
    //Getting index of first image
    const currentFrame = index => (
      `images/bg/bg${(index + 1).toString().padStart(5, '0')}.webp`
    );

    const images = []
    const airpods = {
      frame: 0
    };
//adding all Images to array
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
//Displaying images on scroll
    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
        scrub: 1,
        start: "top top", 
        endTrigger: ".contact-us",
        end: "bottom bottom", 
      },
      onUpdate: render
    });

    images[0].onload = render;
//render image to canvas and adjust image height to canvas size
    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[airpods.frame], 0, 0, images[airpods.frame].width,    images[airpods.frame].height,     // source rectangle
        0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize, false); 
    //Canvas on resize
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    }
  ScrollTrigger.defaults({
      immediateRender: false,
      ease: "power1.inOut",
      scrub: true,
    });
    
  //Homepage - Fading logo/tagline on scroll  
  let main_tl = gsap.timeline({
    
        scrollTrigger: {
          trigger: ".homepage",
          start: "top top", 
          endTrigger: ".homepage",
          end: "bottom center", 
          scrub: 1, 
       }
      
    });
  main_tl
    .to(".box-center", { autoAlpha: 0});
  
  
  //Adding logo to top left
    let logo_tl = gsap.timeline({
       scrollTrigger: {
        trigger: ".section-one",
        start: "top top", 
        scrub: 1, 
     }
  });
  logo_tl
  .to(".logo-top-left", {opacity: 1});

    //text1
  let one_tl = gsap.timeline({
    defaults: {duration:1},
    scrollTrigger: {
    trigger: ".section-two",
   start: "center 50%",
          end: "bottom top",
          pin:true,
      scrub: 1, 
  }
 
});
one_tl
.fromTo(".left-center-content", {y: 25}, {y: -25})
.from(".left-center-content", {opacity: 1, duration: 0.2}, 0)
.to(".left-center-content", {opacity: 0, duration: 0.2}, 0.8);

   //text 2
  let two_tl = gsap.timeline({
    defaults: {duration: 1},
    scrollTrigger: {
     trigger: ".section-three",
     start: "top 10%",
      end: "+=500px",
    pin: true,
    scrub:1,
  }
 
});

two_tl
.to(".right-center-content", {opacity: 1})
.to(".right-center-content", {y:-25, opacity: 0});

//map
let four_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-four",
  start: "center 40%",
  end: "+=400px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

four_tl
.to(".map-center-content", {opacity: 1},"simultaneously")
.to(".column", {opacity: 1},"simultaneously")
.to(".column", {opacity: 0});

// let five_tl = gsap.timeline({
//   defaults: {duration: 3},
//   scrollTrigger: {
//   trigger: ".section-five",
//   start: "top top",
//   end: "+=400px",
//   pin: true,
//   anticipatePin: 1,
//   pinscaping:true,
//   scrub:1,
// }

// });

// five_tl
// .to(".left-center-content", {opacity: 1})
// .to(".left-center-content", {opacity: 0});

    
    //growth
let six_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-six",
  start: "top top",
  end: "+=300px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

six_tl
.to(".left-center-content", {opacity: 1})
.to(".left-center-content", {opacity: 0});

    
    //harvesting
let seven_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-seven",
  start: "top top",
  end: "+=300px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

seven_tl
.to(".right-center-content", {opacity: 1})
.to(".right-center-content", {opacity: 0});

    
    //
let eight_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-eight",
  start: "top top",
  end: "+=500px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

eight_tl
.to(".right-center-content", {opacity: 1, duration: 2})
.to(".right-center-content", {opacity: 0},);

//
let nine_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-nine",
  start: "center 50%",
  end: "+=300px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});
//
nine_tl
.to(".right-center-content", {opacity: 1,duration:2})
.to(".right-center-content", {opacity: 0},2);

let ten_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-ten",
  start: "top top",
  end: "+=300px",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

ten_tl
.to(".right-center-content", {opacity: 1})
.to(".right-center-content", {opacity: 0});

let eleven_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".section-eleven",
  start: "top top",
  end : "+=800px",
markers :true,
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

eleven_tl
.to(".left-center-content", {opacity: 1, duration: 5})
.to(".left-center-content", {opacity: 0, duration:5});




let contact_tl = gsap.timeline({
  defaults: {duration: 3},
  scrollTrigger: {
  trigger: ".contact-us",
  start: "top top",
  end: "bottom center",
  pin: true,
  anticipatePin: 1,
  pinscaping:true,
  scrub:1,
}

});

contact_tl
.to(".right-center-content", {opacity: 1})
}


});
