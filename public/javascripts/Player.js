class Player {
    constructor() {
        this.direction = BABYLON.Vector3.Zero();
        // user input
        window.addEventListener("keydown", event => {
            switch (event.key) {
                case 87: // W
                    console.log('w')
                    this.direction = new BABYLON.Vector3(0, 0, -1);
                    break;
                case 65: // A
                    console.log('a')
                    this.direction = new BABYLON.Vector3(1, 0, 0);
                    break;
                case 83: // S
                    console.log('s')
                    this.direction = new BABYLON.Vector3(0, 0, 1);
                    break;
                case 68: // D
                    console.log('d')
                    this.direction = new BABYLON.Vector3(-1, 0, 0);
                    break;
                default:
            }
        })

        window.addEventListener("keyup", event => {
            this.direction = BABYLON.Vector3.Zero();
        })
    }
}