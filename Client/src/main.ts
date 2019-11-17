
import { UIObjects } from "./ui-objects";
import { Physics } from "./physics";

let ui: UIObjects = new UIObjects();
let physics: Physics = new Physics(ui);
let lastTime = 0;

export function initialize(): void {
    initializeObjects();
    draw();
    // moveBlock();
    gameLoop(lastTime);
}

export function initializeObjects(): void {
    let canvas: HTMLCanvasElement = ui.getCanvas();
    let ctx: CanvasRenderingContext2D = ui.getContext();

    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;

    // create the outer boundary
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.stroke();

    // initialize the towers
    ui.initializeTowers();

    // initialize blocks
    ui.initializeBlocks();

    // Initially set the Tower A top position to x,y cordinates of last block element
    ui.initializeTowerTop();
}

function draw() {
    ui.getTowers().forEach((tower) => {
        tower.draw();
    });

    ui.getBlocks().forEach((block) => {
        block.draw();
    });
}

/* function reDraw(): void {
    ui.clearCanvas();
    draw();
} */

/* function moveBlock(): void {
    physics.animate(reDraw);
} */

function gameLoop(timestamp: number): void {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ui.clearCanvas();
    physics.animate(deltaTime);
    // ui.getBlocks()[0].update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}