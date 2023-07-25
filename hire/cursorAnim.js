// Check if the user is on a touchscreen
if (isMobile()) {
  console.log("There's a cursor animation, but it's disabled on touchscreens.");
} else {
  // Init
  let trail = [];
  let h = 0;
  let userEnabled = true;
  let eventDisabled = false;
  // Styling
  const trailLength = 60;
  const colorSpeed = 1;
  const innerColorSpeed = 4;

  function setup() {
    const canvas = createCanvas(windowWidth, document.body.offsetHeight);
    canvas.parent('cursor-anim');
    colorMode(HSB);
    noFill();
    strokeWeight(5);
  }

  function draw() {
    background('#f7f5f7');
    // if (userEnabled && !eventDisabled) {
    if (userEnabled) {
      trail.push({
        'x': mouseX,
        'y': mouseY
      });

      let thisColor = h;
      for (let i = 1; i < trail.length - 2; i++) {
        const seg0 = trail[i - 1];
        const seg1 = trail[i];
        const seg2 = trail[i + 1];
        const seg3 = trail[i + 2];
        stroke(thisColor, 100, 100);
        drawCatmullRom(seg0, seg1, seg2, seg3);
        thisColor = (thisColor + innerColorSpeed) % 360;
      }

      if (trail.length > trailLength) {
        trail.splice(0, max(trail.length - trailLength, 0));
      }

      h = (h + colorSpeed) % 360;
    }
  }

  function doubleClicked() { // built-in p5 event
    toggleDrawing();
  }

  function toggleDrawing() {
    // Function to toggle drawing on double-click
    if (userEnabled) {
      trail = [];
      userEnabled = false;
    } else {
      userEnabled = true;
    }
  }

  window.addEventListener('scroll', () => {
    if (!eventDisabled) {
      eventDisabled = true;
      console.log('disable');
    }
  });

  window.addEventListener('mousemove', () => {
    if (eventDisabled) {
      eventDisabled = false;
      console.log('enabled');
    }
  });
}

function drawCatmullRom(p0, p1, p2, p3) {
  var amount = 0.01; // Adjust this value for the smoothness
  for (var t = 0; t < 1; t += amount) {
    var x = 0.5 * ((2 * p1.x) +
      (-p0.x + p2.x) * t +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t);
    var y = 0.5 * ((2 * p1.y) +
      (-p0.y + p2.y) * t +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t);
    var px = 0.5 * ((2 * p1.x) +
      (-p0.x + p2.x) * (t + amount) +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * (t + amount) * (t + amount) +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * (t + amount) * (t + amount) * (t + amount));
    var py = 0.5 * ((2 * p1.y) +
      (-p0.y + p2.y) * (t + amount) +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * (t + amount) * (t + amount) +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * (t + amount) * (t + amount) * (t + amount));
    line(x, y, px, py);
  }
}

function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
