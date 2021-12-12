const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function() {
    //scene
    var scene = new BABYLON.Scene(engine);
 
    //materials
    var brickMaterial = new BABYLON.StandardMaterial("StandardMaterial", scene);
    var brickTexture = new BABYLON.BrickProceduralTexture("BrickProceduralTexture" + "text", 512, scene);
    brickTexture.numberOfBricksHeight = 10;
    brickTexture.numberOfBricksWidth = 20;
    brickMaterial.diffuseTexture = brickTexture;

    var wallTexture = new BABYLON.NoiseProceduralTexture("wallTexture", 512, scene)
    wallTexture.brightness = 0.95
    wallTexture.octaves = 10
    wallTexture.persistence = 0.9
    wallTexture.animationSpeedFactor = 0
    wallTexture.uScale = .05
    wallTexture.vScale = 1

    var matWall = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    matWall.baseTexture = wallTexture;
    matWall.baseColor = new BABYLON.Color3(10, 10, 10);
    matWall.metallic = 0.95;
    matWall.roughness = 0.5;
    matWall.sheen.isEnabled = true;
    matWall.sheen.intensity = 0.1;
    matWall.backFaceCulling = true;

    var logoMat = new BABYLON.StandardMaterial("mat", scene);
    var texture = new BABYLON.Texture("../images/logo.png", scene);
    logoMat.diffuseTexture = texture;

    //faceUVs
    const faceUVFront = new Array(6);
    const faceUVBack = new Array(6);
    const faceUVLeft = new Array(6);
    const faceUVRight = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUVFront[i] = new BABYLON.Vector4(0, 0, 0, 0);
        faceUVBack[i] = new BABYLON.Vector4(0, 0, 0, 0);
        faceUVLeft[i] = new BABYLON.Vector4(0, 0, 0, 0);
        faceUVRight[i] = new BABYLON.Vector4(0, 0, 0, 0);
    }

    faceUVFront[1] = new BABYLON.Vector4(0, 0, 1, 1);
    faceUVBack[0] = new BABYLON.Vector4(0, 0, 1, 1);
    faceUVLeft[0] = new BABYLON.Vector4(0, 0, 1, 1);
    faceUVRight[1] = new BABYLON.Vector4(0, 0, 1, 1);

    //meshes
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 140 });

    const storeWallLeft = BABYLON.MeshBuilder.CreateBox("storewallleft", {faceUV: faceUVLeft, width: 140, height: 20, depth: 1 })
    storeWallLeft.rotation.y = Math.PI / 2;
    storeWallLeft.position.x = -50;
    storeWallLeft.position.y = 10;
    storeWallLeft.material = brickMaterial;

    const storeWallRight = BABYLON.MeshBuilder.CreateBox("storewallright", {faceUV: faceUVRight, width: 140, height: 20, depth: 1 })
    storeWallRight.rotation.y = Math.PI / 2;
    storeWallRight.position.x = 50;
    storeWallRight.position.y = 10;
    storeWallRight.material = brickMaterial;

    const storeWallBack = BABYLON.MeshBuilder.CreateBox("storewallback", {faceUV: faceUVBack, width: 100, height: 20, depth: 1 })
    storeWallBack.rotation.y = Math.PI;
    storeWallBack.position.z = 70;
    storeWallBack.position.y = 10;
    storeWallBack.material = matWall;

    const storeWallFront = BABYLON.MeshBuilder.CreateBox("storewallfront", {faceUV: faceUVFront, width: 100, height: 20, depth: 1 })
    storeWallFront.rotation.y = Math.PI;
    storeWallFront.position.z = -70;
    storeWallFront.position.y = 10;
    storeWallFront.material = matWall;

    //logo
    const logo = BABYLON.MeshBuilder.CreateBox("logo", { width: 20, height: 5, depth: 0.5 })
    logo.rotation.x = Math.PI;
    logo.position.z = 69.5;
    logo.position.y = 12.5;
    logo.material = logoMat;

    //counter
    const counter = BABYLON.MeshBuilder.CreateBox("counter", { width: 15, height: 7, depth: 3 })
    counter.position = new BABYLON.Vector3(0, 3, 40);
    counter.material = matWall;

    //merch walls
    var leftSideWalls = [];
    var zIndex = 20;
    for(var i=0; i<4; i++){
        leftSideWalls[i] = BABYLON.MeshBuilder.CreateBox("wall" + i, { width: 7, height: 15, depth: 3 });
        leftSideWalls[i].position = new BABYLON.Vector3(-30, 7, zIndex);
        leftSideWalls[i].rotation.y = Math.PI / 2;
        leftSideWalls[i].material = matWall;
        zIndex -= 20;
    }

    var rightSideWalls = [];
    zIndex = 20;
    for(var i=0; i<4; i++){
        rightSideWalls[i] = BABYLON.MeshBuilder.CreateBox("wall" + i, { width: 7, height: 15, depth: 3 });
        rightSideWalls[i].position = new BABYLON.Vector3(30, 7, zIndex);
        rightSideWalls[i].rotation.y = Math.PI / 2;
        rightSideWalls[i].material = matWall;
        zIndex -= 20;
    }

    //Merch

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    myMaterial.specularColor = new BABYLON.Color3(1, 0, 0);
    myMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
    myMaterial.ambientColor = new BABYLON.Color3(1, 0, 0);

    BABYLON.SceneLoader.ImportMeshAsync("", "../models/", "11apr-shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(-28.5, 7, -40);
        tshirt.scaling = new BABYLON.Vector3(3, 3, 3);
        tshirt.rotation.y = -Math.PI / 2;
        tshirt.material = myMaterial; 
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/", "11apr-shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(-28.5, 7, -20);
        tshirt.scaling = new BABYLON.Vector3(3, 3, 3);
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/", "11apr-shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(-28.5, 7, 0);
        tshirt.scaling = new BABYLON.Vector3(3, 3, 3);
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/", "11apr-shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(-28.5, 7, 20);
        tshirt.scaling = new BABYLON.Vector3(3, 3, 3);
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/Tshirt/", "shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(28, 0, -40);
        tshirt.scaling = new BABYLON.Vector3(0.007, 0.007, 0.007);
        tshirt.rotation.x = Math.PI / 2;
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/Tshirt/", "shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(28, 0, -20);
        tshirt.scaling = new BABYLON.Vector3(0.007, 0.007, 0.007);
        tshirt.rotation.x = Math.PI / 2;
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/Tshirt/", "shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(28, 0, 0);
        tshirt.scaling = new BABYLON.Vector3(0.007, 0.007, 0.007);
        tshirt.rotation.x = Math.PI / 2;
        tshirt.rotation.y = -Math.PI / 2;
    });
    BABYLON.SceneLoader.ImportMeshAsync("", "../models/Tshirt/", "shirt.babylon").then((result) => {
        var tshirt = result.meshes[0];
        tshirt.rotationQuaternion = null;
        tshirt.position = new BABYLON.Vector3(28, 0, 20);
        tshirt.scaling = new BABYLON.Vector3(0.007, 0.007, 0.007);
        tshirt.rotation.x = Math.PI / 2;
        tshirt.rotation.y = -Math.PI / 2;
    });

    //camera and lights
    //const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 100, new BABYLON.Vector3(0, 0, 10));
    //camera.attachControl(canvas, true);

    this.camera = new BABYLON.ArcRotateCamera(
        'camera', -Math.PI / 2,
        Math.PI / 2.5,
        115,
        new BABYLON.Vector3(0, -20, 45),
        scene
    );

    //this.camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(0, 0, 10), scene);

    this.camera.setTarget(BABYLON.Vector3.Zero());
    // allows user to control camera.
    this.camera.attachControl(canvas, true);

    // lighting.
    this.light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        this.scene
    );

    // Keyboard events
    var inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    var cashier = BABYLON.SceneLoader.ImportMeshAsync("", "../models/eric-rigged/", "eric-rigged-001.babylon", scene).then((result) => {
        var cashier = result.meshes[0];
        cashier.scaling = new BABYLON.Vector3(0.10, 0.10, 0.10);
        cashier.position = new BABYLON.Vector3(0, 0.5, 43);
        cashier.scaling = new BABYLON.Vector3(0.06, 0.06, 0.06);
    });

    var register = BABYLON.SceneLoader.ImportMeshAsync("", "../models/", "register.babylon", scene).then((result) => {
        var register = result.meshes[0];
        register.rotationQuaternion = null;
        register.position = new BABYLON.Vector3(0, 6.5, 40);
        register.scaling = new BABYLON.Vector3(0.0008, 0.0008, 0.0008);
        register.rotation.y = Math.PI;
    });

    var counterButton = BABYLON.Mesh.CreatePlane("plane", 2);
    counterButton.parent = counter;
    counterButton.position.x = 6;
    counterButton.position.y = 2;
    counterButton.position.z = -2;
    counterButton.rotation.y = -Math.PI;
    counterButton.rotation.x = Math.PI;
    counterButton.rotation.z = Math.PI;

    var counterButtonTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(counterButton);

    var counterButtonGUI = BABYLON.GUI.Button.CreateSimpleButton("CounterButton", "HELP");
    counterButtonGUI.color = "white";
    counterButtonGUI.fontSize = 200;
    counterButtonGUI.background = "black";

    counterButtonGUI.onPointerUpObservable.add(function() {
        startChat();
        console.log('webchat initiated');
    });

    counterButtonTexture.addControl(counterButtonGUI);


leftSideWalls.forEach(createButtonsLeft);
rightSideWalls.forEach(createButtonsRight);

function createButtonsLeft(item, index, arr){
    var plane = BABYLON.Mesh.CreatePlane("plane", 3);
    plane.parent = item;
    plane.position.y = -2;
    plane.rotation.y = Math.PI;
    plane.position.z = 2;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    var button = BABYLON.GUI.Button.CreateSimpleButton("LeftButton" + index, "BUY");
    button.color = "white";
    button.fontSize = 200;
    button.background = "black";

    button.onPointerUpObservable.add(function() {
        alert("you did it!");
    });

    advancedTexture.addControl(button);
}

function createButtonsRight(item, index, arr){
    var plane = BABYLON.Mesh.CreatePlane("plane", 3);
    plane.parent = item;
    plane.position.y = -2;
    plane.position.z = -2;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    var button = BABYLON.GUI.Button.CreateSimpleButton("RightButton" + index, "BUY");
    button.color = "white";
    button.fontSize = 200;
    button.background = "black";

    button.onPointerUpObservable.add(function() {
        alert("you did it!");
    });

    advancedTexture.addControl(button);
}


const p = new Player(inputMap, camera, scene, counter, leftSideWalls, rightSideWalls, storeWallBack, storeWallLeft, storeWallRight, storeWallFront);
        

    // socket.on('connected', data => {
    //     console.log(data);
    //     const p = new Player(inputMap, scene, counter, leftSideWalls, rightSideWalls, storeWallBack, storeWallLeft, storeWallRight, storeWallFront);
        
    // });

    // socket.on('handshake1', function (data) {
    //     if (player2) {
    //         player2.dispose();
    //     }
    //     const p = new Player(inputMap, scene, counter, leftSideWalls, rightSideWalls, storeWallBack, storeWallLeft, storeWallRight, storeWallFront);
        
    //     socket.emit('handshake2', 'player created');
    // });


    return scene;
};

const scene = createScene(); //Call the createScene function



// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
    engine.resize();
});