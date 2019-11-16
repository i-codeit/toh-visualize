"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const tower_1 = require("./tower");
const block_1 = require("./block");
let towers;
let blocks;
// let uiObjs: Object;
function initialize() {
    let [canvas, ctx] = createContext();
    initializeObjects(canvas, ctx);
    draw();
}
exports.initialize = initialize;
function initializeObjects(canvas, ctx) {
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // create the outer boundary
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.stroke();
    // initialize the towers
    initializeTowers(ctx, canvasWidth);
    // initialize blocks
    initializeBlocks(ctx);
}
exports.initializeObjects = initializeObjects;
function createContext() {
    let canvas = document.getElementById("toh");
    let ctx = canvas.getContext("2d");
    return [canvas, ctx];
}
function initializeTowers(ctx, canvasWidth) {
    let leftWidth;
    let rigthWidth;
    let towerWidth = constants_1.Constants.TOWER_LINEWIDTH;
    let currentPos = { x: 0, y: 0 };
    leftWidth = rigthWidth = (canvasWidth / (constants_1.Constants.NUM_OF_TOWERS * 2)) - (towerWidth / 2);
    for (let index = 0; index < constants_1.Constants.NUM_OF_TOWERS; index++) {
        if (index === 0 || index === constants_1.Constants.NUM_OF_TOWERS - 1) {
            currentPos = { x: currentPos.x + leftWidth, y: 0 };
        }
        else {
            currentPos = { x: currentPos.x + leftWidth + rigthWidth, y: 0 };
        }
        let tower = new tower_1.Tower(ctx, constants_1.TowerId[index], currentPos);
        towers.push(tower);
    }
    // uiObjs = [towers];
}
function initializeBlocks(ctx) {
    let numberOfBlocks = 3;
    let currentHeight = 0;
    for (let index = 0; index < numberOfBlocks; index++) {
        currentHeight += 30;
        let block = new block_1.Block(ctx, index, { x: towers[0].getPosition().x, y: currentHeight }, { x: 30, y: 30 }, constants_1.BlockColor[index]);
        blocks.push(block);
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
//# sourceMappingURL=main.js.map