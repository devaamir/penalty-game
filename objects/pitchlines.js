import * as THREE from "three";

// Function to create the ball
export function pitchLines(scene) {
  // Create lines
  const lineMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  // Create side lines of penalty box
  const sideLineGeometry = new THREE.BoxGeometry(68, 0.1, 0.1);
  const strightLine = new THREE.Mesh(sideLineGeometry, lineMaterial);
  const strightLineOpp = new THREE.Mesh(sideLineGeometry, lineMaterial);
  strightLineOpp.position.set(0, 0.05, 52.5);
  strightLine.position.set(0, 0.05, -52.5);
  scene.add(strightLineOpp);
  scene.add(strightLine);

  // Create through lines
  const throughLineGeometry = new THREE.BoxGeometry(0.2, 0.1, 105);
  const throughLine = new THREE.Mesh(throughLineGeometry, lineMaterial);
  const throughLineOpp = new THREE.Mesh(throughLineGeometry, lineMaterial);
  throughLine.position.set(34, 0.05, 0);
  throughLineOpp.position.set(-34, 0.05, 0);
  scene.add(throughLineOpp);
  scene.add(throughLine);

  // Create front lines
  const frontLineBoxGeometry = new THREE.BoxGeometry(12.8, 0.1, 0.1);
  const frontLineBox = new THREE.Mesh(frontLineBoxGeometry, lineMaterial);
  const frontLineBoxOpp = new THREE.Mesh(frontLineBoxGeometry, lineMaterial);
  frontLineBoxOpp.position.set(0, 0.05, 48.88);
  frontLineBox.position.set(0, 0.05, -48.88);
  scene.add(frontLineBoxOpp);
  scene.add(frontLineBox);

  // outer front lines
  const outerFrontLineGeometry = new THREE.BoxGeometry(29.26, 0.1, 0.1);
  const outerFrontLine = new THREE.Mesh(outerFrontLineGeometry, lineMaterial);
  const outerFrontLineOpp = new THREE.Mesh(
    outerFrontLineGeometry,
    lineMaterial
  );
  outerFrontLine.position.set(0, 0.05, 40.72);
  outerFrontLineOpp.position.set(0, 0.05, -40.72);
  scene.add(outerFrontLineOpp);
  scene.add(outerFrontLine);

  // outer side lines
  const outerPenaltyBoxGeometry = new THREE.BoxGeometry(0.2, 0.1, 11.88);
  const outerPenaltyLeftBox = new THREE.Mesh(
    outerPenaltyBoxGeometry,
    lineMaterial
  );
  const outerPenaltyRightBox = new THREE.Mesh(
    outerPenaltyBoxGeometry,
    lineMaterial
  );
  outerPenaltyLeftBox.position.set(14.6, 0.05, -46.6);
  outerPenaltyRightBox.position.set(-14.6, 0.05, -46.6);
  scene.add(outerPenaltyRightBox);
  scene.add(outerPenaltyLeftBox);

  // outer side opposite lines
  const outerOppPenaltyBoxGeometry = new THREE.BoxGeometry(0.2, 0.1, 11.88);
  const outerOppPenaltyLeftBox = new THREE.Mesh(
    outerOppPenaltyBoxGeometry,
    lineMaterial
  );
  const outerOppPenaltyRightBox = new THREE.Mesh(
    outerOppPenaltyBoxGeometry,
    lineMaterial
  );
  outerOppPenaltyLeftBox.position.set(14.6, 0.05, 46.6);
  outerOppPenaltyRightBox.position.set(-14.6, 0.05, 46.6);
  scene.add(outerOppPenaltyRightBox);
  scene.add(outerOppPenaltyLeftBox);

  // create penalty box
  const penaltyBoxGeometry = new THREE.BoxGeometry(0.2, 0.1, 3.65);
  const penaltyLeftBox = new THREE.Mesh(penaltyBoxGeometry, lineMaterial);
  const penaltyRightBox = new THREE.Mesh(penaltyBoxGeometry, lineMaterial);
  penaltyLeftBox.position.set(6.4, 0.05, -50.66);
  penaltyRightBox.position.set(-6.4, 0.05, -50.66);
  scene.add(penaltyRightBox);
  scene.add(penaltyLeftBox);

  // create penalty box
  const oppPenaltyBoxGeometry = new THREE.BoxGeometry(0.2, 0.1, 3.65);
  const oppPenaltyLeftBox = new THREE.Mesh(oppPenaltyBoxGeometry, lineMaterial);
  const oppPenaltyRightBox = new THREE.Mesh(
    oppPenaltyBoxGeometry,
    lineMaterial
  );
  oppPenaltyLeftBox.position.set(6.4, 0.05, 50.66);
  oppPenaltyRightBox.position.set(-6.4, 0.05, 50.66);
  scene.add(oppPenaltyLeftBox);
  scene.add(oppPenaltyRightBox);
}
