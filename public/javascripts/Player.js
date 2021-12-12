class Player {
    constructor(inputMap, scene, counter, leftSideWalls, rightSideWalls, storeWallBack, storeWallLeft, storeWallRight, storeWallFront) {
        this.character = BABYLON.SceneLoader.ImportMeshAsync("", "../models/casual_man/", "scene.gltf", scene).then((result) => {
            
            var camera = new BABYLON.ArcRotateCamera(
                'camera', -Math.PI / 2,
                Math.PI / 2.5,
                115,
                new BABYLON.Vector3(0, -20, 45),
                scene
            );

            var characterMesh = result.meshes[0];
            characterMesh.rotationQuaternion = null;
            characterMesh.scaling = new BABYLON.Vector3(0.065, 0.065, 0.065);
            characterMesh.position = new BABYLON.Vector3(0, 0, -40);
            characterMesh.rotation.x = Math.PI;
            characterMesh.rotation.y = Math.PI;
            characterMesh.rotation.z = -Math.PI;
    
            //todo : fix
            const importedAnims = result.animationGroups;
            let animation = [];
            animation.push(importedAnims[27].targetedAnimations);
            console.log(animation)
    
            importedAnims[27].dispose();
            
            var animating = false;
            var skeleton = animation[0];
            skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            skeleton.animationPropertiesOverride.enableBlending = true;
            skeleton.animationPropertiesOverride.blendingSpeed = 0.5;
            skeleton.animationPropertiesOverride.loopMode = 1;
    
            // Game/Render loop
            scene.onBeforeRenderObservable.add( () => {
    
                var keydown = false;
                if (inputMap["w"]) {
                    characterMesh.position.z += 0.5
                    characterMesh.rotation.y = 2 * Math.PI / 2
                    camera.setTarget(characterMesh.position);
                    keydown = true;
    
                    if(characterMesh.intersectsMesh(counter, false)){
                        console.log('intersection with wall');
                        characterMesh.position.z -= 2;
                    }
    
                    if(characterMesh.intersectsMesh(storeWallBack, false) || characterMesh.intersectsMesh(storeWallLeft, false) || characterMesh.intersectsMesh(storeWallRight, false), characterMesh.intersectsMesh(storeWallFront, false)){
                        console.log('intersection with wall')
                        characterMesh.position.z -= 2
                    }
    
                    if(characterMesh.intersectsMesh(rightSideWalls[0], false) || characterMesh.intersectsMesh(rightSideWalls[1], false) || characterMesh.intersectsMesh(rightSideWalls[2], false) || characterMesh.intersectsMesh(rightSideWalls[3], false) || characterMesh.intersectsMesh(leftSideWalls[0], false)  || characterMesh.intersectsMesh(leftSideWalls[1], false) || characterMesh.intersectsMesh(leftSideWalls[2], false)  || characterMesh.intersectsMesh(leftSideWalls[3], false)){
                        console.log('intersection with wall')
                        characterMesh.position.z -= 2
                    }
                }
                if (inputMap["a"]) {
                    characterMesh.position.x -= 0.5
                    characterMesh.rotation.y = -3 * Math.PI / 2
                    camera.setTarget(characterMesh.position);
                    keydown = true;
    
                    if(characterMesh.intersectsMesh(counter, false)){
                        console.log('intersection with wall');
                        characterMesh.position.x += 2;
                    }
    
                    if(characterMesh.intersectsMesh(storeWallBack, false) || characterMesh.intersectsMesh(storeWallLeft, false) || characterMesh.intersectsMesh(storeWallRight, false)){
                        console.log('intersection with wall');
                        characterMesh.position.x += 2;
                    }
    
                    if(characterMesh.intersectsMesh(rightSideWalls[0], false) || characterMesh.intersectsMesh(rightSideWalls[1], false) || characterMesh.intersectsMesh(rightSideWalls[2], false) || characterMesh.intersectsMesh(rightSideWalls[3], false) || characterMesh.intersectsMesh(leftSideWalls[0], false)  || characterMesh.intersectsMesh(leftSideWalls[1], false) || characterMesh.intersectsMesh(leftSideWalls[2], false)  || characterMesh.intersectsMesh(leftSideWalls[3], false)){
                        console.log('intersection with wall');
                        characterMesh.position.x += 2;
                    }
                }
                if (inputMap["s"]) {
                    characterMesh.position.z -= 0.5
                    characterMesh.rotation.y = -Math.PI
                    camera.setTarget(characterMesh.position);
                    keydown = true;
    
                    if(characterMesh.intersectsMesh(counter, false)){
                        console.log('intersection with wall');
                        characterMesh.position.z += 2;
                    }
    
                    if( characterMesh.intersectsMesh(storeWallBack, false) || characterMesh.intersectsMesh(storeWallLeft, false) || characterMesh.intersectsMesh(storeWallRight, false) ){
                        console.log('intersection with wall');
                        characterMesh.position.z += 2;
                    }
    
                    if( characterMesh.intersectsMesh(rightSideWalls[0], false) || characterMesh.intersectsMesh(rightSideWalls[1], false) || characterMesh.intersectsMesh(rightSideWalls[2], false) || characterMesh.intersectsMesh(rightSideWalls[3], false) || characterMesh.intersectsMesh(leftSideWalls[0], false)  || characterMesh.intersectsMesh(leftSideWalls[1], false) || characterMesh.intersectsMesh(leftSideWalls[2], false)  || characterMesh.intersectsMesh(leftSideWalls[3], false)){
                        console.log('intersection with wall');
                        characterMesh.position.z += 2;
                    }
                }
                if (inputMap["d"]) {
                    characterMesh.position.x += 0.5
                    characterMesh.rotation.y = -Math.PI / 2
                    camera.setTarget(characterMesh.position);
                    keydown = true;
    
                    if(characterMesh.intersectsMesh(counter, false)){
                        console.log('intersection with wall');
                        characterMesh.position.x -= 2;
                    }
    
                    if(characterMesh.intersectsMesh(storeWallBack, false) || characterMesh.intersectsMesh(storeWallLeft, false) || characterMesh.intersectsMesh(storeWallRight, false)){
                        console.log('intersection with wall');
                        characterMesh.position.x -= 2;
                    }
    
                    if(characterMesh.intersectsMesh(rightSideWalls[0], false) || characterMesh.intersectsMesh(rightSideWalls[1], false) || characterMesh.intersectsMesh(rightSideWalls[2], false) || characterMesh.intersectsMesh(rightSideWalls[3], false) || characterMesh.intersectsMesh(leftSideWalls[0], false)  || characterMesh.intersectsMesh(leftSideWalls[1], false) || characterMesh.intersectsMesh(leftSideWalls[2], false)  || characterMesh.intersectsMesh(leftSideWalls[3], false) ){
                        console.log('intersection with wall')
                        characterMesh.position.x -= 2;
                    }
    
                }
    
                if (keydown) {
                    if (!animating) {
                        animating = true;
                        scene.beginAnimation(skeleton, 0, 100, true);
                        myFunction();
                    }
    
                } else {
                    animating = false;
                    scene.stopAnimation(skeleton)
                }
    
            })

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            function myFunction() {
                walks[getRandomInt(4)].play();
            }

            //audio
            var walks = [
                new BABYLON.Sound("Walking1", "../audio/Walking1.wav", scene),
                new BABYLON.Sound("Walking2", "../audio/Walking2.wav", scene),
                new BABYLON.Sound("Walking3", "../audio/Walking3.wav", scene),
                new BABYLON.Sound("Walking4", "../audio/Walking4.wav", scene)
            ]
    
        });
    }
}