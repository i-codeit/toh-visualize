
import { UIObjects } from "./ui-objects";
import { Physics } from "./physics";
import { EventQueue } from "./eventQueue";
import axios from "axios";
import { EventInterface } from "./eventInterface";
import { Constants } from "./constants";

let ui: UIObjects = new UIObjects();
let eq: EventQueue = new EventQueue();
let physics: Physics = new Physics(ui, eq);

let lastTime = 0;

export function initialize(): void {
    initializeObjects();
    draw();
}

/**
 * This gets fired as soon as user selects a different value for blocks
 * @param numberOfBlocks number of blocks to be set
 */
export function reDrawBlocks(numberOfBlocks: number) {
    ui.clearCanvas();
    ui.setNumberOfBlocksToDraw(numberOfBlocks);

    initializeObjects();
    draw();
}

/**
 * This gets fired on the "try" button of the HTML page
 * and sends request to the server, fetches the response
 * and sets the Physics engine rolling!
 */
export async function onClickEvent(): Promise<void> {

    let url1 = `http://127.0.0.1:3000?blocks=${ui.getNumberOfBlocksToDraw()}`;
    let actualObj: EventInterface[] = [];

    axios({
        method: 'get',
        url: url1
    })
    .then((response: any) => {
        console.log(response.data);
        actualObj = response.data;

        actualObj.forEach((value) => {
            // since client id's are arranged from 0 to 9 - bottom to top
            // but server sends id's as 1 to 9 - top to bottom
            value.blockId = Math.abs(value.blockId - ui.getNumberOfBlocksToDraw());
            eq.pushEvent(value);
        });
    
        // Pop the first event here
        eq.popEvent();
    
        update(lastTime);
    });
}

/**
 * Initializes all the canvas elements of the page
 */
export function initializeObjects(): void {
    createOuterBoundary();

    // initialize the towers
    ui.initializeTowers();

    // initialize blocks
    ui.initializeBlocks();

    // Initially set the Tower A top position to x,y cordinates of last block element
    ui.initializeTowerTop();
}

function createOuterBoundary() {
    let canvas: HTMLCanvasElement = ui.getCanvas();
    let ctx: CanvasRenderingContext2D = ui.getContext();

    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;

    // create the outer boundary
    ctx.beginPath();
    ctx.lineWidth = Constants.BOUNDARY_LINEWIDTH;
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.closePath();
    ctx.stroke();
}

/**
 * Gets called on every requestAnimationFrame
 */
function draw() {
    createOuterBoundary();
    ui.getTowers().forEach((tower) => {
        tower.draw();
    });

    ui.getBlocks().forEach((block) => {
        block.draw();
    });
}

/**
 * This is the main loop, which clears the canvas and updates the animation
 * at every requestAnimationFrame, which is typically 60 frames/sec
 * @param timestamp 
 */
function update(timestamp: number): void {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ui.clearCanvas();
    physics.animate(deltaTime);
    draw();

    requestAnimationFrame(update);
}