// import * as THREE from "three";
// import * as CANNON from "cannon-es";

// // Function to create goalpost and net with proportional scaling and customizable position
// export function createGoal(
//   scene,
//   world,
//   postWidth = 10, // Width of the goal
//   postHeight = 5, // Height of the goal
//   postThickness = 0.1, // Thickness of the posts and crossbar
//   position = { x: 0, y: 0, z: -25 } // Default position of the goal
// ) {
//   const goalMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

//   // Scaling ratios for the net and side nets
//   const netDepth = postWidth * 0.3; // Adjust net depth proportionally to width

//   // Left goalpost
//   const leftPostGeometry = new THREE.CylinderGeometry(
//     postThickness,
//     postThickness,
//     postHeight
//   );
//   const leftPost = new THREE.Mesh(leftPostGeometry, goalMaterial);
//   leftPost.position.set(
//     position.x - postWidth / 2,
//     position.y + postHeight / 2,
//     position.z
//   );
//   scene.add(leftPost);

//   // Right goalpost
//   const rightPostGeometry = new THREE.CylinderGeometry(
//     postThickness,
//     postThickness,
//     postHeight
//   );
//   const rightPost = new THREE.Mesh(rightPostGeometry, goalMaterial);
//   rightPost.position.set(
//     position.x + postWidth / 2,
//     position.y + postHeight / 2,
//     position.z
//   );
//   scene.add(rightPost);

//   // Crossbar
//   const crossbarGeometry = new THREE.CylinderGeometry(
//     postThickness,
//     postThickness,
//     postWidth
//   );
//   const crossbar = new THREE.Mesh(crossbarGeometry, goalMaterial);
//   crossbar.rotation.z = Math.PI / 2;
//   crossbar.position.set(position.x, position.y + postHeight, position.z);
//   scene.add(crossbar);

//   // Create the net using a grid of physics segments in CANNON.js
//   const netSegmentsX = 10;
//   const netSegmentsY = 10;
//   const netSegmentWidth = postWidth / netSegmentsX;
//   const netSegmentHeight = postHeight / netSegmentsY;

//   const netMaterial = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     wireframe: true,
//     transparent: true,
//     opacity: 0.4,
//   });

//   const netGroup = new THREE.Group(); // Group to hold the net segments
//   const netBodies = []; // Array to hold the physics bodies for net segments
//   for (let i = 0; i <= netSegmentsX; i++) {
//     for (let j = 0; j <= netSegmentsY; j++) {
//       // Create a net segment in Three.js
//       const netSegmentGeometry = new THREE.PlaneGeometry(
//         netSegmentWidth,
//         netSegmentHeight
//       );
//       const netSegment = new THREE.Mesh(netSegmentGeometry, netMaterial);

//       netSegment.position.set(
//         position.x - postWidth / 2 + i * netSegmentWidth,
//         position.y + postHeight - j * netSegmentHeight,
//         position.z - netDepth
//       );
//       scene.add(netSegment);

//       // Create corresponding physics body in Cannon.js
//       const netSegmentShape = new CANNON.Box(
//         new CANNON.Vec3(netSegmentWidth / 2, netSegmentHeight / 2, 0.01)
//       );
//       const netSegmentBody = new CANNON.Body({
//         mass: 0.01, // Light mass for soft physics behavior
//         position: new CANNON.Vec3(
//           position.x - postWidth / 2 + i * netSegmentWidth,
//           position.y + postHeight - j * netSegmentHeight,
//           position.z - netDepth
//         ),
//       });
//       netSegmentBody.addShape(netSegmentShape);
//       world.addBody(netSegmentBody);
//       netBodies.push(netSegmentBody);

//       // Add to group for synchronization
//       netGroup.add(netSegment);
//     }
//   }

//   scene.add(netGroup);

//   // Attach the top left and right corners of the net to the goalposts using DistanceConstraints
//   const attachNetToGoal = () => {
//     const topLeftBody = netBodies[0]; // Top-left corner of the net
//     const topRightBody = netBodies[netSegmentsX]; // Top-right corner of the net

//     // Create a constraint for the left post to the top-left net segment
//     const leftConstraint = new CANNON.DistanceConstraint(
//       topLeftBody,
//       world.bodies[0], // Assuming the left post is the first body in world.bodies
//       0 // Zero distance since it's directly attached
//     );
//     world.addConstraint(leftConstraint);

//     // Create a constraint for the right post to the top-right net segment
//     const rightConstraint = new CANNON.DistanceConstraint(
//       topRightBody,
//       world.bodies[1], // Assuming the right post is the second body in world.bodies
//       0
//     );
//     world.addConstraint(rightConstraint);
//   };

//   // Sync net physics with Three.js objects
//   const syncNetPhysics = () => {
//     netGroup.children.forEach((segment, index) => {
//       const netBody = netBodies[index]; // Get the corresponding physics body
//       segment.position.copy(netBody.position);
//       segment.quaternion.copy(netBody.quaternion);
//     });
//   };

//   attachNetToGoal(); // Attach the net to the goalposts

//   return { syncNetPhysics };
// }

import * as THREE from "three";

// Function to create goalpost and net with proportional scaling and customizable position
export function createGoal(
  scene,
  postWidth = 10, // Width of the goal
  postHeight = 5, // Height of the goal
  postThickness = 0.1, // Thickness of the posts and crossbar
  position = { x: 0, y: 0, z: -25 } // Default position of the goal
) {
  const goalMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

  // Scaling ratios for the net and side nets
  const netDepth = postWidth * 0.3; // Adjust net depth proportionally to width

  // Left goalpost
  const leftPostGeometry = new THREE.CylinderGeometry(
    postThickness,
    postThickness,
    postHeight
  );
  const leftPost = new THREE.Mesh(leftPostGeometry, goalMaterial);
  leftPost.position.set(
    position.x - postWidth / 2,
    position.y + postHeight / 2,
    position.z
  ); // Adjust position based on the provided position
  scene.add(leftPost);

  // Right goalpost
  const rightPostGeometry = new THREE.CylinderGeometry(
    postThickness,
    postThickness,
    postHeight
  );
  const rightPost = new THREE.Mesh(rightPostGeometry, goalMaterial);
  rightPost.position.set(
    position.x + postWidth / 2,
    position.y + postHeight / 2,
    position.z
  );
  scene.add(rightPost);

  // Crossbar
  const crossbarGeometry = new THREE.CylinderGeometry(
    postThickness,
    postThickness,
    postWidth
  );
  const crossbar = new THREE.Mesh(crossbarGeometry, goalMaterial);
  crossbar.rotation.z = Math.PI / 2;
  crossbar.position.set(position.x, position.y + postHeight, position.z);
  scene.add(crossbar);

  // Ground goal line (optional)
  const groundBarGeometry = new THREE.CylinderGeometry(
    postThickness,
    postThickness,
    postWidth
  );
  const groundBar = new THREE.Mesh(groundBarGeometry, goalMaterial);
  groundBar.rotation.z = Math.PI / 2;
  groundBar.position.set(position.x, position.y, position.z);
  scene.add(groundBar);

  // Create net using PlaneGeometry with proportional depth
  const netGeometry = new THREE.PlaneGeometry(postWidth, postHeight, 10, 10);
  const netMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });

  const net = new THREE.Mesh(netGeometry, netMaterial);
  net.position.set(
    position.x,
    position.y + postHeight / 2,
    position.z - netDepth
  );
  scene.add(net);

  // Side nets proportional to postHeight
  const sideNetGeometry = new THREE.PlaneGeometry(netDepth, postHeight, 10, 10);

  const rightNet = new THREE.Mesh(sideNetGeometry, netMaterial);
  rightNet.position.set(
    position.x + postWidth / 2,
    position.y + postHeight / 2,
    position.z - netDepth / 2
  );
  rightNet.rotation.y = Math.PI / 2;
  scene.add(rightNet);

  const leftNet = new THREE.Mesh(sideNetGeometry, netMaterial);
  leftNet.position.set(
    position.x - postWidth / 2,
    position.y + postHeight / 2,
    position.z - netDepth / 2
  );
  leftNet.rotation.y = Math.PI / 2;
  scene.add(leftNet);

  // Top net proportional to width
  const topNetGeometry = new THREE.PlaneGeometry(postWidth, netDepth, 10, 10);

  const topNet = new THREE.Mesh(topNetGeometry, netMaterial);
  topNet.position.set(
    position.x,
    position.y + postHeight,
    position.z - netDepth / 2
  );
  topNet.rotation.x = Math.PI / 2;
  scene.add(topNet);
}
