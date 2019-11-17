import { Constants } from "./constants";
import { UIObjects } from "./ui-objects";

export class Physics {
    private fps: number;
    private percent: number;
    private direction: number;
    private ui: UIObjects;

    constructor(ui: UIObjects) {
        this.ui = ui;
        this.fps = Constants.FPS;
        this.percent = 0;
        this.direction = 1;
    }

    public animate(deltaTime: number): void {
        // set the animation position (0-100)
        this.percent += this.direction;
        if (this.percent < 0) {
            this.percent = 0;
            this.direction = 1;
        };
        if (this.percent > 100) {
            this.percent = 100;
            this.direction = 0;
        };
    
        this.moveBlock(this.percent);
    }

    public moveBlock(sliderValue: number): void {
        let ctx: CanvasRenderingContext2D = this.ui.getContext();
        ctx.beginPath();
        // ctx.moveTo(250, 120);
        // ctx.bezierCurveTo(290, -40, 300, 200, 400, 150);
        ctx.moveTo(100, 670);
        ctx.bezierCurveTo(80, 200, 330, 200, 310, 700);
        // ctx.strokeStyle = 'blue';
        // ctx.stroke();
    
    
        // draw the tracking rectangle
        let newPoints: { x: number, y: number } = {x: 0, y:0};
    
        if (sliderValue) {
            var percent = (sliderValue) / 100
    
            newPoints = this.getCubicBezierXYatPercent({
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
        this.drawEllipse(newPoints, "red");
    }

/*     public move(command: string): void {

    } */

    // draw tracking rect at xy
    public drawEllipse(point: { x: number, y: number }, color: string) {
        let ctx: CanvasRenderingContext2D = this.ui.getContext();
        ctx.fillStyle = "cyan";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(point.x, point.y, 30, 30, 0, 0, Math.PI, true);
        // ctx.rect(point.x - 13, point.y - 8, 25, 15);
        ctx.fill();
        // ctx.stroke();
    }

    // cubic bezier percent is 0-1
    public getCubicBezierXYatPercent(
        startPt: { x: number, y: number },
        controlPt1: { x: number, y: number },
        controlPt2: { x: number, y: number },
        endPt: { x: number, y: number },
        percent: number): { x: number, y: number } {
        var x = this.CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
        var y = this.CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
        return ({
            x: x,
            y: y
        });
    }

    // cubic helper formula at percent distance
    public CubicN(pct: number, a: number, b: number, c: number, d: number) {
        var t2 = pct * pct;
        var t3 = t2 * pct;
        return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
    }

}