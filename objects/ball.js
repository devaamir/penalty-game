import * as THREE from "three";

// Function to create the ball
export function createBall(texture) {
  // Create the ball geometry
  const ballGeometry = new THREE.SphereGeometry(0.5, 32, 100);
  const ballMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.position.set(0, 0.5, -43); // Position at the penalty spot
  return ball;
}
