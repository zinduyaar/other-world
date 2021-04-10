gsap.utils.toArray ('.scrollAnimateSection').forEach (section => {
  let tl = gsap.timeline ({
    scrollTrigger: {
      trigger: section,
      start: `center center`,
      end: () => '+=' + section.offsetHeight,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
    defaults: {ease: 'none'},
  });
  var canvas = section.querySelector ('canvas');
  const canvasId = section.dataset['canvasId'];
  const context = canvas.getContext ('2d');

  window.addEventListener ('resize', resizeCanvas, false);

  function resizeCanvas () {
    canvas.width = 414;
    canvas.height = window.outerHeight;
  }
  resizeCanvas ();

  let frameCount = 0;
  const images = [];
  const airpods = {
    frame: 0,
  };

  if (canvasId == 'first') {
    frameCount = 805;
    for (let i = 1; i <= 805; i++) {
      const img = new Image ();
      img.src = `bg/section-1/1 (${i}).webp`;
      images.push (img);
    }
  } else if (canvasId == 'second') {
    frameCount = 711;
    for (let i = 1; i <= 711; i++) {
      const img = new Image ();
      img.src = `bg/section-2/2 (${i}).webp`;
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

  const txtAnim = section.querySelectorAll ('.txtAnim');
  for (var i = 0; i < txtAnim.length; i++) {
    const duration = txtAnim[i].dataset['duration'];
    const neverHide = txtAnim[i].dataset['neverHide'];
    console.log (txtAnim[i]);
    if (neverHide) {
      tl.fromTo (
        txtAnim[i],
        {
          autoAlpha: 0,
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
  ctx.drawImage (img, cx, cy, cw, ch, x, y, w, h);
}
