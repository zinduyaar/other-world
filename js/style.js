gsap.utils.toArray ('.scrollAnimateSection').forEach (section => {
  const sectionTriggerStart = section.dataset['sectionTriggerStart'];
  let tl = gsap.timeline ({
    scrollTrigger: {
      trigger: section,
      //start: `center ${sectionTriggerStart}`,
      start: `center center`,
      // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
      end: () => '+=' + section.offsetHeight,
      scrub: true,
      pin: true,

      anticipatePin: 1,
    },
    defaults: {ease: 'none'},
  });

  const canvasId = section.dataset['canvasId'];
  const canvas = document.getElementById (canvasId);
  const startFrame = canvas.dataset['startFrame'];
  const totalFarmes = canvas.dataset['totalFrames'];
  const context = canvas.getContext ('2d');

  window.addEventListener ('resize', resizeCanvas, false);

  function resizeCanvas () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas ();

  const frameCount = totalFarmes;
  const currentFrame = index =>
    `images/bg/bg${(index + 1).toString ().padStart (5, '0')}.webp`;

  const images = [];
  const airpods = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    if (i + parseInt (startFrame) == 60) {
      for (let j = 0; j < 52; j++) {
        const img = new Image ();
        let mapExtendedStartIndex = 1935;
        img.src = `images/bg/MapExtended/bg${(mapExtendedStartIndex + j)
          .toString ()
          .padStart (5, '0')}.webp`;
        images.push (img);
      }
    } else if (i + parseInt (startFrame) == 71) {
      // for (let j = 0; j < 15; j++) {
      //   const img = new Image ();
      //   let mapExtendedStartIndex = 1;
      //   // img.src = `images/seed/${(mapExtendedStartIndex + j).toString ()}.jpg`;
      //   img.src = `images/seed/${(mapExtendedStartIndex + 0).toString ()}.jpg`;
      //   images.push (img);
      // }
    } else if (i + parseInt (startFrame) == 125) {
      // else if (i + parseInt (startFrame) == 81) {
      //   for (let j = 0; j < 103; j++) {
      //     const img = new Image ();
      //     let mapExtendedStartIndex = 2215;
      //     img.src = `images/1. First right circle/bg${(mapExtendedStartIndex + j)
      //       .toString ()
      //       .padStart (5, '0')}.webp`;
      //     images.push (img);
      //   }

      //   for (let j = 0; j < 98; j++) {
      //     const img = new Image ();
      //     let mapExtendedStartIndex = 1;
      //     img.src = `images/leftcircle/a (${(mapExtendedStartIndex + j).toString ()}).webp`;
      //     images.push (img);
      //   }

      //   for (let j = 0; j < 56; j++) {
      //     const img = new Image ();
      //     let mapExtendedStartIndex = 136;
      //     img.src = `images/bg/bg${(mapExtendedStartIndex + j)
      //       .toString ()
      //       .padStart (5, '0')}.webp`;
      //     images.push (img);
      //   }

      //   i = 191;
      // }
      for (let j = 0; j < 110; j++) {
        const img = new Image ();
        img.src = `images/bg/bg00125.webp`;
        images.push (img);
      }
    } else if (i + parseInt (startFrame) == 162) {
      for (let j = 0; j < 11; j++) {
        const img = new Image ();
        let maxIndex = 162;
        img.src = `images/bg/bg${(maxIndex - j)
          .toString ()
          .padStart (5, '0')}.webp`;

        images.push (img);
      }
    } else {
      // else if (i + parseInt (startFrame) == 192) {
      //   for (let j = 0; j < 141; j++) {
      //     const img = new Image ();
      //     let mapExtendedStartIndex = 1;
      //     img.src = `images/6. Hemp smokes circle/b (${(mapExtendedStartIndex + j).toString ()}).webp`;
      //     images.push (img);
      //   }
      //   i = 257;
      // }
      const img = new Image ();
      img.src = currentFrame (i + parseInt (startFrame));
      images.push (img);
    }
  }

  tl.to (airpods, {
    frame: frameCount,
    snap: 'frame',
    scrollTrigger: {
      trigger: canvas,
      start: 'top center',
      end: 'bottom top',
      scrub: 1,
      pinSpacing: false,
    },
    paused: true,
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  });

  images[0].onload = render;
  //Adding logo to top left

  const txtAnim = section.querySelectorAll ('.txtAnim');
  for (var i = 0; i < txtAnim.length; i++) {
    const duration = txtAnim[i].dataset['duration'];
    const yAxis = txtAnim[i].dataset['y'];
    const neverHide = txtAnim[i].dataset['neverHide'];

    // tl.from (txtAnim[i], {
    //   duration: duration,
    //   y: yAxis,
    //   autoAlpha: 0,
    //   ease: 'power1.inOut',
    // });

    if (neverHide) {
      tl.fromTo (
        txtAnim[i],
        {
          autoAlpha: 0,
          y: yAxis,
        },
        {
          autoAlpha: 1,
          duration: duration,
          ease: 'power1.inOut',
        }
      );
    } else {
      tl
        .fromTo (
          txtAnim[i],
          {
            autoAlpha: 0,
            y: yAxis,
          },
          {
            autoAlpha: 1,
            duration: duration,
            ease: 'power1.inOut',
          }
        )
        .to (txtAnim[i], {
          autoAlpha: 0,
          duration: duration,
          ease: 'power1.inOut',
        });
    }
  }

  function render () {
    if (images[airpods.frame]) {
      const i = airpods.frame;
      context.clearRect (0, 0, canvas.width, canvas.height);
      drawImageProp (
        context,
        images[i],
        0,
        0,
        canvas.width,
        canvas.height,
        0.5,
        0.5
      );
    }
  }
});

function drawImageProp (ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min (w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs (ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  // if (
  //   img.src.indexOf ('images/seed/') >= 0 ||
  //   img.src.indexOf ('images/bg/bg0007') >= 0 ||
  //   img.src.indexOf ('images/bg/bg0006') >= 0
  // ) {
  // } else {
  //   ctx.drawImage (img, cx, cy, cw, ch, x, y, w, h);
  // }
  ctx.drawImage (img, cx, cy, cw, ch, x, y, w, h);
  if (img.src.indexOf ('images/bg/bg00079') >= 0) {
    console.log (img);
  }
}

window.onscroll = function () {
  stickHeaderToTop ();
};

var header = document.getElementById ('navbar-header');
var sticky = header.offsetTop;

function stickHeaderToTop () {
  if (window.pageYOffset > sticky) {
    header.classList.add ('sticky');
  } else {
    header.classList.remove ('sticky');
  }
}
