import { Object } from "./object";
import { Constants } from "./constants";

export class Text implements Object {
    private ctx: CanvasRenderingContext2D;
    private textId: number;
    private position: { x: number, y: number };
    private textHeight: number;

    constructor(
        ctx: CanvasRenderingContext2D,
        textId: number,
        position: { x: number, y: number },
        textHeight: number) {
        this.ctx = ctx;
        this.textId = textId;
        this.position = position;
        this.textHeight = textHeight;
    }

    public draw(): void {
        let fontHeight = this.textHeight;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'alphabetic';
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${fontHeight}px Arial`;
        this.ctx.fillText(
            `${this.textId + 1}`,
            this.position.x,
            this.position.y - Constants.MAGIC_TEXT_ALIGN);
    }
}