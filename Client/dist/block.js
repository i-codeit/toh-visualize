"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(ctx, id, position, radius, color) {
        this.ctx = ctx;
        this.id = id;
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(this.position.x, this.position.y, this.radius.x, this.radius.y, 0, 0, Math.PI, true);
        this.ctx.fill();
    }
    getHeight() {
        return this.radius.y;
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map