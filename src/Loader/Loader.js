import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const model = new Promise((res, rej) => {
    const loader = new FBXLoader();
    loader.load("solenoid_only_5.fbx", function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                console.log(child.name);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        res(object);
    });
});

export default model;
