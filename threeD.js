import * as THREE from 'three';
import { TextureLoader } from 'three';
// // import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// //Creating a scene
// const scene = new THREE.Scene();

// //texture

// const texture = new THREE.TextureLoader().load('./img/html-5.png',()=>{
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.repeat.set(2,1)
// })


// //Creating a sphere;
// const SphereGeometry=new THREE.SphereGeometry(1.5);
// const sphereMaterial= new THREE.MeshBasicMaterial({
// 	color:0xff8001,
//     // map: new THREE.TextureLoader().load('./img/html-5.png')
//     map: texture
// })
// const completeSphere= new THREE.Mesh(SphereGeometry,sphereMaterial);
// scene.add(completeSphere);


// // completeSphere.position.x=-8


//  //Creating light
// const pointLight = new THREE.SpotLight(0xffffff,1);
// // pointLight.position.set(0,2,3);
// // scene.add(pointLight);
// pointLight.position.set(15,30,10);
// pointLight.castShadow = true;
// pointLight.shadow.mapSize.width = 1024;
// pointLight.shadow.mapSize.height = 1024;
// pointLight.shadow.camera.near = 10;
// pointLight.shadow.camera.far = 100;
// scene.add(pointLight)




// // //Creating a camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
// camera.position.z = 15;

// scene.add(camera);




// //Creating a renderer
// const canvas= document.querySelector('.webgl');


// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setClearColor(0xffbf69,1)
// renderer.setSize( window.innerWidth , window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFShadowMap;
// renderer.render(scene,camera);

// function animate(){
//     requestAnimationFrame(animate);
//     completeSphere.rotation.y += 0.005;
//     renderer.render(scene,camera)
// }

// animate()



const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;  // Enable shadows
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Softer shadows
        document.body.appendChild(renderer.domElement);

        // Sphere geometry
        const geometry = new THREE.SphereGeometry(5, 32, 32);

        // Load texture and set specific width and height for the image on the sphere
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./img/html-5.png', (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 1); // Repeat image 2 times horizontally, 1 time vertically
        });

        // Material for the sphere
        const material = new THREE.MeshBasicMaterial({
            map: texture
        });

        // Create the sphere mesh with the material
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;  // Sphere will cast shadows
        scene.add(sphere);

        // Create a plane (floor) to receive the shadow
        const planeGeometry = new THREE.PlaneGeometry(500, 500);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -5;  // Place the plane below the sphere
        plane.receiveShadow = true;  // Plane will receive shadows
        scene.add(plane);

        // Add a spotlight for shadows
        const light = new THREE.SpotLight(0xffffff, 1);
        light.position.set(15, 30, 10);
        light.castShadow = true;  // Light will cast shadows
        light.shadow.mapSize.width = 1024;  // Shadow resolution
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.near = 10;
        light.shadow.camera.far = 100;
        scene.add(light);

        // Set the camera position
        camera.position.z = 20;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate the sphere
            sphere.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
        animate();

        // Adjust window size on resize
        window.addEventListener('resize', function () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });