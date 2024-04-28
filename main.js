import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useJSON } from './card';

import gsap from 'gsap';


let kartu = document.querySelector('.card-container');

function cardTransition(){

  gsap.fromTo(
    kartu,
    { display: "block", x: 0 },
    { display: "block", x: -200, duration: 1, delay: 2, ease: "sine.inOut" }
  );

  // Animasi muncul
  gsap.fromTo(
    kartu,
    { display: "block", opacity: 0 },
    { display: "block", opacity: 1, duration: 1, delay: 1, ease: "sine.out" }
  );

  
}


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xA3A3A3);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / innerHeight,
  0.1, 
  1000
);
camera.position.set(-2, -2, 0);
camera.lookAt(60, 3.5, 0);


const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight( 0xffffff, 100 );
				spotLight.position.set( 2.5, 2, 2.5 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 3;
				spotLight.decay = 2;
				spotLight.distance = 0;
        spotLight.castShadow = true;
				spotLight.shadow.focus = 1;

        scene.add(spotLight);


const loadingManager = new THREE.LoadingManager();

const loaderContainer = document.querySelector('.loader-container');
const welcomeText = document.querySelector('.welcome');
const detailCard = document.querySelector('.card-container');
const goodBye = document.querySelector('.goodBye');


  loadingManager.onLoad = function(){
    loaderContainer.style.display = 'none';
    gsap.to(welcomeText, {opacity: 1, duration: 2, delay: 1})
    alert('Klik Layar untuk memulai :)');
}


const gltfLoader = new GLTFLoader(loadingManager);
 

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

let position = 0;


gltfLoader.load('vr_gallery.glb', function(gltf){
      const model = gltf.scene;
      scene.add(model);
      console.log(model);

      window.addEventListener('mouseup', function(){
        switch(position) {
          case 0: // DONE
            moveCamera(7, -1.5, 0);
            rotateCamera(0, 0, 0);
            position = 1;
            gsap.to(welcomeText, {opacity: 0, duration: 1});
            useJSON(0);
            cardTransition();
            break; 

          case 1: // DONE
            moveCamera(-4.5, -1.5, 0);
            rotateCamera(0, 0, 0);
            position = 2;
        

            useJSON(1);
            cardTransition();
            break;

          case 2: // DONE
            moveCamera(1.3, -1.5, 0);
            rotateCamera(0, 0, 0)
            position = 3;

            useJSON(2);
            cardTransition();
            break;

          case 3: //DONE 
            moveCamera(-7.3, -1.5, 0);
            rotateCamera(0, 3.2, 0);
            position = 4;

            useJSON(3);
            cardTransition();
            break;

          case 4: // DONE
            moveCamera(4.1, -1.5, 0);
            rotateCamera(0, 3.2, 0);
            position = 5;

            useJSON(4);
            cardTransition();
            break;

          case 5: // DONE 
            moveCamera(-1.6, -1.5, 0);
            rotateCamera(0, 3.2, 0);
            position = 6;

            useJSON(5);
            cardTransition();
            break;

          default:
            moveCamera(-9, -1.5, 0);
            rotateCamera(0, -1.5, 0);
            position = -1;
            gsap.to(kartu, {opacity: 0,x: 0, duration: 1});
            gsap.to(goodBye, {opacity: 1, duration: 2});

            
        }
      });

      function moveCamera(x, y, z){
        gsap.to(camera.position, {
            x,
            y,
            z,
            duration: 3
        });
      }

      function rotateCamera(x, y, z){
        gsap.to(camera.rotation, {
          x,
          y,
          z,
          duration: 3.2
        })
      }

});

function animate(){
  renderer.render(scene, camera);
  console.log(position); 

}

renderer.setAnimationLoop(animate);


window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




