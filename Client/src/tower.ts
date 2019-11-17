import { Object } from "./object";
import { Constants } from "./constants";

export class Tower implements Object{
    private ctx: CanvasRenderingContext2D;
    private id: string;
    private lineWidth: number;
    private towerHeight: number;
    private position: {x:number, y:number};
    private towerTopPosition: {x:number, y:number};

    constructor(
        ctx: CanvasRenderingContext2D,
        id: string,
        position: {x:number, y:number}
    ) {
        this.ctx = ctx;
        this.id = id;
        this.lineWidth = Constants.TOWER_LINEWIDTH;
        this.towerHeight = Constants.TOWER_HEIGHT;
        this.position = position;
        this.towerTopPosition = {x: 0, y: 0};
    }

    public draw(): void {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x, this.towerHeight);
        this.ctx.stroke();
    }

    public getPosition(): {x: number, y: number} {
        return this.position;
    }

    public setTowerTopPosition(towerTopPosition: number) {
        this.towerTopPosition = {x: this.position.x, y: towerTopPosition};
    }

    public getTowerTopPosition() {
        return this.towerTopPosition;
    }
}