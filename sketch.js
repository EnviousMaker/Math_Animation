
// --- Variables that control the animation ---
let angle = 0;              // Current angle in radians (starts at 0)
let orbitRadius = 150;      // How far the blue dot is from the center
let angularSpeed = 0.03;    // How much the angle increases every frame
let isPaused = false;       // true = animation is paused, false = running

// Center of the canvas (will be calculated in setup)
let centerX, centerY;

function setup() {
  createCanvas(600, 450);   // Create a 600 x 450 pixel canvas
  
  // Put the center of the orbit in the middle of the canvas
  centerX = width / 2;
  centerY = height / 2;
  
  // Set text style for the instructions
  textAlign(LEFT, TOP);
  textSize(14);
}

function draw() {
  background(20, 25, 40);   // Dark blue background
  
  // ----------------------------------------------------------
  // MATHEMATICS: Calculate the position of the orbiting dot
  //
  // x = centerX + orbitRadius * cos(angle)
  // y = centerY + orbitRadius * sin(angle)
  //
  // As the angle increases, the dot moves around the circle.
  // ----------------------------------------------------------
  let x = centerX + orbitRadius * cos(angle);
  let y = centerY + orbitRadius * sin(angle);
  
  // Draw the faint circular path (just for visual clarity)
  noFill();
  stroke(80, 100, 140);
  strokeWeight(1);
  circle(centerX, centerY, orbitRadius * 2);
  
  // Draw the yellow center point ("sun")
  fill(255, 200, 50);
  noStroke();
  circle(centerX, centerY, 20);
  
  // Draw a thin line from the center to the orbiting dot
  // This helps show the radius
  stroke(255, 200, 50, 100);
  strokeWeight(1);
  line(centerX, centerY, x, y);
  
  // Draw the blue orbiting dot
  fill(100, 200, 255);
  noStroke();
  circle(x, y, 18);
  
  // Update the angle only if the animation is not paused
  // This is the variable that changes over time
  if (!isPaused) {
    angle += angularSpeed;
  }
  
  // ----------------------------------------------------------
  // Display control instructions and live values on the canvas
  // ----------------------------------------------------------
  fill(220);
  noStroke();
  text("CONTROLS:", 15, 15);
  text("• Click mouse  →  Pause / Resume", 15, 35);
  text("• Left Arrow   →  Slow down", 15, 55);
  text("• Right Arrow  →  Speed up", 15, 75);
  
  // Show the current mathematical values
  text("Current angle (radians): " + nf(angle, 1, 2), 15, height - 70);
  text("Angular speed: " + nf(angularSpeed, 1, 3), 15, height - 50);
  text(isPaused ? "Status: PAUSED" : "Status: RUNNING", 15, height - 30);
}

// Pause or resume the animation when the mouse is clicked
function mousePressed() {
  isPaused = !isPaused;   // Flip between true and false
}

// Change the orbital speed with the arrow keys
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // Slow down, but never go below a very small speed
    angularSpeed = max(0.005, angularSpeed - 0.01);
  } else if (keyCode === RIGHT_ARROW) {
    // Speed up
    angularSpeed += 0.01;
  }
}
