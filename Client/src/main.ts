
import { UIObjects } from "./ui-objects";
import { Physics } from "./physics";
import { EventQueue } from "./eventQueue";
import axios from "axios";
import { EventInterface } from "./eventInterface";

let ui: UIObjects = new UIObjects();
let eq: EventQueue = new EventQueue();
let physics: Physics = new Physics(ui, eq);

let lastTime = 0;

export function initialize(): void {
    initializeObjects();
    draw();
}

export function reDrawBlocks(numberOfBlocks: number) {
    ui.clearCanvas();
    ui.setNumberOfBlocksToDraw(numberOfBlocks);

/*     // initialize blocks
    ui.initializeBlocks();

    // Initially set the Tower A top position to x,y cordinates of last block element
    ui.initializeTowerTop(); */
    initializeObjects();
    
    /* ui.getBlocks().forEach((block) => {
        block.draw();
    }); */
    draw();
}

export async function onClickEvent(): Promise<void> {
    // dummy insert element 
    /* eq.pushEvent({blockId: 9, towerFrom: "A", towerTo: "B"});
    eq.pushEvent({blockId: 8, towerFrom: "A", towerTo: "C"});
    eq.pushEvent({blockId: 7, towerFrom: "A", towerTo: "B"});
    eq.pushEvent({blockId: 8, towerFrom: "C", towerTo: "A"}); */

    let url1 = `http://127.0.0.1:3000?blocks=${ui.getNumberOfBlocksToDraw()}`;
    let actualObj: EventInterface[] = [];

    axios({
        method: 'get',
        url: url1
        /* data : {
            blocks: ui.getNumberOfBlocksToDraw()
        } */
    })
    .then((response: any) => {
        console.log(response.data);
        actualObj = response.data;
        /* console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config); */

        actualObj.forEach((value) => {
            // since client id's are arranged from 0 to 9 - bottom to top
            // but server sends id's as 1 to 9 - top to bottom
            value.blockId = Math.abs(value.blockId - ui.getNumberOfBlocksToDraw());
            eq.pushEvent(value);
        });
    
        // Pop the first event here
        eq.popEvent();
    
        gameLoop(lastTime);
    });

    // Actual list of 4
    // actualObj = [{"blockId":1,"towerFrom":"A","towerTo":"B"},{"blockId":2,"towerFrom":"A","towerTo":"C"},{"blockId":1,"towerFrom":"B","towerTo":"C"},{"blockId":3,"towerFrom":"A","towerTo":"B"},{"blockId":1,"towerFrom":"C","towerTo":"A"},{"blockId":2,"towerFrom":"C","towerTo":"B"},{"blockId":1,"towerFrom":"A","towerTo":"B"},{"blockId":4,"towerFrom":"A","towerTo":"C"},{"blockId":1,"towerFrom":"B","towerTo":"C"},{"blockId":2,"towerFrom":"B","towerTo":"A"},{"blockId":1,"towerFrom":"C","towerTo":"A"},{"blockId":3,"towerFrom":"B","towerTo":"C"},{"blockId":1,"towerFrom":"A","towerTo":"B"},{"blockId":2,"towerFrom":"A","towerTo":"C"},{"blockId":1,"towerFrom":"B","towerTo":"C"}];
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