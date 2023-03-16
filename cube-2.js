
/*
refs
camera
https://www.youtube.com/watch?v=cNCGdy8I8QQ

gallery basics
https://www.youtube.com/watch?v=-LYzINUN-mU&t=4111s

//textures
https://www.youtube.com/watch?v=vLz2Rk1r_gQ&t=195s

code by:
Ieva Vaitiekunaite

*/

//import libraries
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';

//declare variables
let light;

// setup the camera
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.set(-5, 0, 5);



//render and add to the canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("sketch-container").appendChild( renderer.domElement );

// window.addEventListener('resize', function(){
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     // renderer.setSize(width,height);
//     camera.aspect = width/height;
//     camera.updateProjectionMatrix;
// })

let controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//create new scene
const scene = new THREE.Scene();

//TEXTURES

// load jello art
const jello = new THREE.TextureLoader().load('/imgs/jello1.jpg')
jello.wrapS = THREE.ClampToEdgeWrapping;

// load tree art
const tree = new THREE.TextureLoader().load('/imgs/WayOfTheSword.jpg')
tree.wrapS = THREE.ClampToEdgeWrapping;

// load lohr sculpture
const lohr= new THREE.TextureLoader().load('/imgs/sculptures-loehr.jpg')
tree.wrapS = THREE.ClampToEdgeWrapping;


// Texture of the floor
const floorTexture = new THREE.TextureLoader().load('/imgs/Floor.jpg'); 
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);





// document.addEventListener('keydown', onKeyDown, false);


// add light to see
light = new THREE.AmbientLight( 0xfffafe ); 
scene.add( light );





// Create the floor plane.
const planeGeometry = new THREE.PlaneGeometry(45, 45); 
const planeMaterial = new THREE.MeshBasicMaterial({ 
  map: floorTexture, 
  side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2; 
floorPlane.position.y = -Math.PI/2;
scene.add(floorPlane); // add the floor to the scene

// Create the walls
let wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup); // add the group to the scene, then any child added to the group will display to the scene too

// Front Wall
const frontWall = new THREE.Mesh( 
  new THREE.BoxGeometry(50, 20, 0.001), 
  new THREE.MeshLambertMaterial({ color: 'green' })
);


// Left Wall
const leftWall = new THREE.Mesh( 
  new THREE.BoxGeometry(50, 20, 0.001), 
  new THREE.MeshLambertMaterial({ 
    color: 'white',
  })
);

leftWall.rotation.y = Math.PI / 2; 
leftWall.position.x = -5; // 

// Right Wall
const rightWall = new THREE.Mesh( 
  new THREE.BoxGeometry(50, 20, 0.001), 
  new THREE.MeshLambertMaterial({ 
    color: 'white',
  })
);

rightWall.position.x = 10;
rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

wallGroup.add(frontWall, leftWall, rightWall);

// add box
let scalex = 1.4;
let scalez = 0.02;

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({
    map: jello
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.scale.x = scalex;
box.scale.z = scalez;
scene.add(box);

//painting 2
const boxGeometry2 = new THREE.BoxGeometry();
const boxMaterial2 = new THREE.MeshStandardMaterial({
    map: tree
});
const box2 = new THREE.Mesh(boxGeometry2, boxMaterial2);

box2.position.x = 2

box2.scale.x = scalex;
box2.scale.z = scalez;
scene.add(box2);

//sculpture
const boxGeometry3 = new THREE.BoxGeometry();
const boxMaterial3 = new THREE.MeshStandardMaterial({
    map: lohr
});
const box3 = new THREE.Mesh(boxGeometry3, boxMaterial3);

box3.position.x = 4
box3.position.z = 1.5

box3.scale.set(0.7, 0.7, 0.7);
scene.add(box3);

window.addEventListener('resize', onWindowResize );

//if one wishes to animate
function animate() {
    // box.rotation.x += 0.001;
    // box.rotation.y += 0.001;
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
    // controls.update();
}
animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

}



