import * as THREE from "three";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import model from "./Loader/Loader.js";
import { Vector3 } from "three";

const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var ArToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
});
ArToolkitSource.init(function () {
    setTimeout(function () {
        ArToolkitSource.onResizeElement();
        ArToolkitSource.copyElementSizeTo(renderer.domElement);
    }, 2000);
});
var ArToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "./camera_para.dat",
    detectionMode: "color_and_matrix",
});

ArToolkitContext.init(function () {
    camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
});

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
    type: "pattern",
    patternUrl: "./pattern-marker.patt",
    changeMatrixMode: "cameraTransformMatrix",
});

scene.visible = false;
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial({
//     transparent: true,
//     opacity: 0.5,
//     side: THREE.DoubleSide,
// });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = geometry.parameters.height / 2;
// scene.add(cube);
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
light.position.set(0.15,0.15,0.15);
scene.add( light );

model.then((object) => {
    scene.add(object);
    let s = 0.15;
    // let p = 200;
    for (let i = 0; i < object.children.length; i++) {
        object.children[i].scale.set(s, s, s);
        object.children[i].position.set(s, s, s);
    }
    console.log(object);
});

// camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visible = camera.visible;
    renderer.render(scene, camera);
}

animate();
