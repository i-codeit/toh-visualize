import { Tower } from "./tower";
import { Block } from "./block";
import { Constants, TowerId, BlockColor } from "./constants";

/**
 * UI class which has all the canvas elements
 */
export class UIObjects {
    private towers: Tower[];
    private blocks: Block[];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private numOfBlocks: number;

    constructor() {
        this.towers = Array<Tower>();
        this.blocks = Array<Block>();
        this.canvas = document.getElementById("toh") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.numOfBlocks = 4;

        return this;
    }

    /**
     * Towers are initialized, with x,y cordinates set,
     * taking care of the tower width also
     */
    public initializeTowers(): void {
        let leftWidth: number;
        let rigthWidth: number;
        let towerWidth = Constants.TOWER_LINEWIDTH;
        let currentPos: { x: number, y: number } = { x: 0, y: 0 };
        let canvasWidth = this.canvas.clientWidth;
        let canvasHeight = this.canvas.clientHeight;
    
        leftWidth = rigthWidth = (canvasWidth / (Constants.NUM_OF_TOWERS * 2)) - (towerWidth / 2);
        for (let index = 0; index < Constants.NUM_OF_TOWERS; index++) {
    
            if (index === 0) {
                currentPos = { x: currentPos.x + leftWidth, y: canvasHeight };
            }
            else {
                currentPos = { x: currentPos.x + leftWidth + rigthWidth + towerWidth, y: canvasHeight };
            }
            let tower = new Tower(this.ctx, TowerId[index], currentPos);
            this.towers.push(tower);
        }
    }
    
    /**
     * Blocks are initialized on top on one another on Tower A
     */
    public initializeBlocks(): void {
        this.blocks.splice(0, this.blocks.length);
        let numberOfBlocks: number = this.getNumberOfBlocksToDraw();
        let currentHeight: number = this.canvas.clientHeight;
    
        for (let index = 0; index < numberOfBlocks; index++) {
            let block = new Block(
                this.ctx,
                index,
                { x: this.towers[0].getPosition().x, y: currentHeight },
                BlockColor[index]
            );
            this.blocks.push(block);
            currentHeight -= block.getRadiusY();
        }
    }

    /**
     * Initial height of each tower is set, based on the number of blocks it holds
     */
    public initializeTowerTop() {
        let canvasHeight = this.canvas.clientHeight;
        this.towers[0].setTowerTopPosition(
            this.blocks[this.getNumberOfBlocksToDraw()-1].getPosition().y
            - this.blocks[this.getNumberOfBlocksToDraw()-1].getRadiusY());
        this.towers[1].setTowerTopPosition(canvasHeight);
        this.towers[2].setTowerTopPosition(canvasHeight);
    }

    public getNumberOfBlocksToDraw(): number {
        return this.numOfBlocks;
    }

    public setNumberOfBlocksToDraw(value: number) {
        this.numOfBlocks = value;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    public getCanvas(): HTMLCanvasElement{
        return this.canvas;
    }

    public getTowers(): Array<Tower> {
        return this.towers;
    }

    public getBlocks(): Array<Block> {
        return this.blocks;
    }

    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }
}