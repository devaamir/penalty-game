import * as THREE from "three";

// Create and export a function to generate the field
export function createField(grassTexture) {
  // Configure the grass texture wrapping and repetition
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(8, 8); // Adjust these values as needed

  // Create the field geometry and material
  const fieldGeometry = new THREE.PlaneGeometry(80, 120);
  const fieldMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
  const field = new THREE.Mesh(fieldGeometry, fieldMaterial);

  // Rotate the field to make it flat on the ground
  field.rotation.x = -Math.PI / 2;

  // Set the position of the field
  field.position.y = 0;

  // Return the field mesh
  return field;
}
