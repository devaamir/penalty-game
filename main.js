import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createField } from "./objects/grass.js"; // Import the field creation function
import { createGoal } from "./objects/goalpost.js"; // Import the goal creation function
import { createBall } from "./objects/ball.js"; // Import the ball creation function
import { pitchLines } from "./objects/pitchlines.js";
import { createBrickWall } from "./objects/brickwall.js";

// Create scene
const scene = new THREE.Scene();

// Create Cannon.js world
const world = new CANNON.World();
world.gravity.set(0, -20, 0); // Set gravity to pull objects down

// Load the football texture
const textureLoader = new THREE.TextureLoader().load("assets/ball.jpg");
const grassTexture = new THREE.TextureLoader().load("assets/grass.jpeg");

// Create camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.set(0, 10, 5); // Closer camera position
// camera.lookAt(0, 5, -40); // Keep the camera focused on the goal

// Get the slider elements
const cameraX = document.getElementById("cameraX");
const cameraY = document.getElementById("cameraY");
const cameraZ = document.getElementById("cameraZ");
const lookAtX = document.getElementById("lookAtX");
const lookAtY = document.getElementById("lookAtY");
const lookAtZ = document.getElementById("lookAtZ");

// Get the span elements for displaying the values
const cameraXValue = document.getElementById("cameraXValue");
const cameraYValue = document.getElementById("cameraYValue");
const cameraZValue = document.getElementById("cameraZValue");
const lookAtXValue = document.getElementById("lookAtXValue");
const lookAtYValue = document.getElementById("lookAtYValue");
const lookAtZValue = document.getElementById("lookAtZValue");

function updateCamera() {
  // Update camera position based on the sliders
  camera.position.set(
    parseFloat(cameraX.value),
    parseFloat(cameraY.value),
    parseFloat(cameraZ.value)
  );

  // Update camera lookAt target
  camera.lookAt(
    parseFloat(lookAtX.value),
    parseFloat(lookAtY.value),
    parseFloat(lookAtZ.value)
  );

  // Update the displayed values
  cameraXValue.textContent = cameraX.value;
  cameraYValue.textContent = cameraY.value;
  cameraZValue.textContent = cameraZ.value;
  lookAtXValue.textContent = lookAtX.value;
  lookAtYValue.textContent = lookAtY.value;
  lookAtZValue.textContent = lookAtZ.value;
}

// Add event listeners to the sliders
cameraX.addEventListener("input", updateCamera);
cameraY.addEventListener("input", updateCamera);
cameraZ.addEventListener("input", updateCamera);
lookAtX.addEventListener("input", updateCamera);
lookAtY.addEventListener("input", updateCamera);
lookAtZ.addEventListener("input", updateCamera);

// Initial camera setup
updateCamera();

// Create renderer and set the sky color to blue
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb); // Light blue sky (hex color code for sky blue)
document.body.appendChild(renderer.domElement);

// Create ambient light
const ambientLight = new THREE.AmbientLight(0x808080, 2); // Soft light
scene.add(ambientLight);

// Add a directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

// Create the field (a green plane)
const field = createField(grassTexture);
scene.add(field);
createGoal(scene, 10, 5, 0.1, { x: 0, y: 0, z: -52.5 });
// const goal = createGoal(scene, world, 10, 5, 0.1, { x: 0, y: 0, z: -52.5 }); // Adjust sizes (width, height, depth, thickness)
// const net = createNet(world, 10, 5, 0.05, { x: 0, y: 2.5, z: -52 });
// scene.add(net);
// const ball = createBall(textureLoader);
// scene.add(ball);

pitchLines(scene);

// Create materials for the ball and the ground
const ballMaterial = new CANNON.Material("ballMaterial");
const groundMaterial = new CANNON.Material("groundMaterial");

// Cannon.js - Create the ground (field) physics body
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass: 0, // Ground should be static, so mass is zero
  material: groundMaterial, // Apply ground material
});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be flat on the XZ plane
world.addBody(groundBody);

// Create the ball in Three.js and Cannon.js
const ball = createBall(textureLoader);
scene.add(ball);

// Cannon.js ball physics body
const ballShape = new CANNON.Sphere(0.5); // Radius of the ball (same as in Three.js)
const ballBody = new CANNON.Body({
  mass: 1, // Ball mass
  shape: ballShape,
  position: new CANNON.Vec3(0, 5, -43), // Initial position of the ball
  material: ballMaterial, // Apply ball material
  linearDamping: 0.8, // Controls movement damping
  angularDamping: 0.7, // Higher value to reduce spinning (closer to 1 for more resistance) // Slows down rotation over time
});
world.addBody(ballBody);

const ballGroundContactMaterial = new CANNON.ContactMaterial(
  ballMaterial,
  groundMaterial,
  {
    friction: 0.4, // Friction for sliding (tuning value)
    restitution: 0.8, // Bounciness (higher value = more bounce)
  }
);

// Add the contact material to the world
world.addContactMaterial(ballGroundContactMaterial);

// Physics update function
function updatePhysics() {
  world.step(1 / 60); // Step the physics world

  // Sync ball's position and rotation
  ball.position.copy(ballBody.position);
  ball.quaternion.copy(ballBody.quaternion);

  // Sync the net's physics with Three.js
  // goal.syncNetPhysics();
}

// Variables to track key presses
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Event listener for keydown
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      moveForward = true;
      break;
    case "ArrowDown":
      moveBackward = true;
      break;
    case "ArrowLeft":
      moveLeft = true;
      break;
    case "ArrowRight":
      moveRight = true;
      break;
  }
});

// Update ball movement based on key presses with center-applied forces to prevent spin
function updateBallMovement() {
  const forceMagnitude = 7.5; // Reduced force for smoother movement

  if (moveForward) {
    ballBody.velocity.z = -forceMagnitude; // Directly set velocity to avoid spin
  }
  if (moveBackward) {
    ballBody.velocity.z = forceMagnitude;
  }
  if (moveLeft) {
    ballBody.velocity.x = -forceMagnitude;
  }
  if (moveRight) {
    ballBody.velocity.x = forceMagnitude;
  }
}

function updateCameraPosition() {
  // Offset the camera position to be slightly behind and above the ball
  const cameraOffset = new THREE.Vector3(0, 5, 50); // Adjust for height and distance behind the ball

  // Get the current position of the ball
  const ballPosition = ballBody.position;

  // Position the camera slightly behind and above the ball
  camera.position.copy(ballPosition).add(cameraOffset);
}

function animate() {
  requestAnimationFrame(animate);

  updatePhysics(); // Update the physics world
  // brickWall.syncBrickPhysics(); // Sync the brick wall physics
  updateBallMovement(); // Update ball movement
  updateCameraPosition(); // Move the camera with the ball

  // Render the scene
  renderer.render(scene, camera);
}

// Event listener for keyup
document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowUp":
      moveForward = false;
      break;
    case "ArrowDown":
      moveBackward = false;
      break;
    case "ArrowLeft":
      moveLeft = false;
      break;
    case "ArrowRight":
      moveRight = false;
      break;
  }
});

// Start the animation loop
animate();
