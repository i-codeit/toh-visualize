import {} from "./object";
import { Text } from "./text";
import { Constants } from "./constants";

export class Block implements Object{
    private ctx: CanvasRenderingContext2D;
    private id: number;
    private position: {x:number, y:number};
    private color: string;
    private text: Text;

    public constructor(
        ctx: CanvasRenderingContext2D,
        id: number,
        position: {x:number, y:number},
        color: string) {
        this.ctx = ctx;
        this.id = id;
        this.position = position;
        this.color = color;
        this.text = new Text( this.ctx, this.id, this.position, this.getRadiusY());
    }

    public draw(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(
            this.position.x,
            this.position.y,
            this.getRadiusX(),
            this.getRadiusY(),
            0,
            0,
            Math.PI, true);
        this.ctx.fill();

        // Add text
        this.text.draw();
    }

    public getRadiusX(): number {
        return Constants.ELLIPSE_RADIUS_X - (this.id * Constants.MAGIC_REDUCE_RATIO);
    }

    public getRadiusY(): number {
        return this.getRadiusX() * Constants.ELLIPSE_RADIUS_RATIO;
    }

    public getPosition(): {x:number, y:number} {
        return this.position;
    }

    /* public update(deltaTime: number) {
        if(!deltaTime)
            return;
        this.position.x += 5 / deltaTime;
    } */
}