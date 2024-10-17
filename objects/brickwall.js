import * as THREE from "three";
import * as CANNON from "cannon-es";

export function createBrickWall(
  scene,
  world,
  brickWidth = 1,
  brickHeight = 0.5,
  brickDepth = 0.3,
  rows = 6,
  columns = 10,
  position = { x: 0, y: 0, z: -30 }
) {
  const brickMaterial = new THREE.MeshStandardMaterial({ color: 0xa52a2a });
  const brickGroup = new THREE.Group();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const brickGeometry = new THREE.BoxGeometry(
        brickWidth,
        brickHeight,
        brickDepth
      );
      const brick = new THREE.Mesh(brickGeometry, brickMaterial);

      const xPos =
        position.x - (columns * brickWidth) / 2 + col * (brickWidth + 0.01); // Small gap
      const yPos = position.y + row * (brickHeight + 0.01);
      const zPos = position.z;

      brick.position.set(xPos, yPos, zPos);
      scene.add(brick);

      const brickShape = new CANNON.Box(
        new CANNON.Vec3(brickWidth / 2, brickHeight / 2, brickDepth / 2)
      );
      const brickBody = new CANNON.Body({
        mass: row === 0 ? 0 : 1, // Bottom row is static
        position: new CANNON.Vec3(xPos, yPos, zPos),
        shape: brickShape,
        sleepTimeLimit: 1, // Add sleep state to prevent initial movement
      });

      brickBody.sleep(); // Start the body in a sleeping state to avoid initial movement

      world.addBody(brickBody);
      brickGroup.add(brick);
    }
  }

  scene.add(brickGroup);

  // Synchronize physics bodies with Three.js meshes
  const syncBrickPhysics = () => {
    brickGroup.children.forEach((brick, index) => {
      const brickBody = world.bodies[index + 1]; // Sync positions
      brick.position.copy(brickBody.position);
      brick.quaternion.copy(brickBody.quaternion);
    });
  };

  return { syncBrickPhysics };
}
