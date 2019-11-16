
import { Constants, TowerId, BlockColor } from "./constants";
import { Tower } from "./tower";
import { Block } from "./block";

let towers: Tower[] = Array<Tower>();
let blocks: Block[] = Array<Block>();
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
// let uiObjs: Object;

export function initialize(): void {
    [canvas, ctx] = createContext();
    initializeObjects(canvas, ctx);
    draw();
}

export function initializeObjects(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D): void {
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;

    // create the outer boundary
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.stroke();

    // initialize the towers
    initializeTowers(ctx, canvasWidth, canvasHeight);

    // initialize blocks
    initializeBlocks(ctx, canvasHeight);

    // Initially set the Tower A top position to x,y cordinates of last block element
    towers[0].setTowerTopPosition(blocks[getNumberOfBlocksToDraw()-1].getPosition());
}

function createContext(): [HTMLCanvasElement, CanvasRenderingContext2D] {
    let canvas = document.getElementById("toh") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    return [canvas, ctx];
}


function initializeTowers(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
): void {
    let leftWidth: number;
    let rigthWidth: number;
    let towerWidth = Constants.TOWER_LINEWIDTH;
    let currentPos: { x: number, y: number } = { x: 0, y: 0 };

    leftWidth = rigthWidth = (canvasWidth / (Constants.NUM_OF_TOWERS * 2)) - (towerWidth / 2);
    for (let index = 0; index < Constants.NUM_OF_TOWERS; index++) {

        if (index === 0) {
            currentPos = { x: currentPos.x + leftWidth, y: canvasHeight };
        }
        else {
            currentPos = { x: currentPos.x + leftWidth + rigthWidth, y: canvasHeight };
        }
        let tower = new Tower(ctx, TowerId[index], currentPos);
        towers.push(tower);
    }
    // uiObjs = [towers];
}

function initializeBlocks(
    ctx: CanvasRenderingContext2D,
    canvasHeight: number
): void {
    let numberOfBlocks: number = getNumberOfBlocksToDraw();
    let currentHeight: number = canvasHeight;

    for (let index = 0; index < numberOfBlocks; index++) {
        let block = new Block(
            ctx,
            index,
            { x: towers[0].getPosition().x, y: currentHeight },
            BlockColor[index]
        );
        blocks.push(block);
        currentHeight -= block.getRadiusY();
    }
    // uiObjs = [uiObjs, blocks];
}

function draw() {
    towers.forEach((tower) => {
        tower.draw();
    });

    blocks.forEach((block) => {
        block.draw();
    });
}

function getNumberOfBlocksToDraw(): number {
    return 10;
}

// set starting values
let fps: number = 30;
let percent: number = 0
let direction: number = 1;

function animate() {
    // set the animation position (0-100)
    percent += direction;
    if (percent < 0) {
        percent = 0;
        direction = 1;
    };
    if (percent > 100) {
        percent = 100;
        direction = 0;
    };

    moveBlock(percent);

    // request another frame
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / fps);
}

function moveBlock(sliderValue: number) {
    
    // redraw path
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initialize();

    ctx.beginPath();
    // ctx.moveTo(250, 120);
    // ctx.bezierCurveTo(290, -40, 300, 200, 400, 150);
    ctx.moveTo(100, 670);
    ctx.bezierCurveTo(80, 200, 330, 200, 310, 700);
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();


    // draw the tracking rectangle
    var xy;

    if (sliderValue) {
        var percent = (sliderValue) / 100

        xy = getCubicBezierXYatPercent({
            x: 100,
            y: 670
        }, {
            x: 80,
            y: 200
        }, {
            x: 330,
            y: 200
        }, {
            x: 310,
            y: 700
        }, percent);
    }
    drawEllipse(xy, "red");
}