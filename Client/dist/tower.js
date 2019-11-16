"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Tower {
    constructor(ctx, id, position) {
        this.ctx = ctx;
        this.id = id;
        this.lineWidth = constants_1.Constants.TOWER_LINEWIDTH;
        this.towerHeight = constants_1.Constants.TOWER_HEIGHT;
        this.position = position;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x, this.towerHeight);
    }
    getPosition() {
        return this.position;
    }
}
exports.Tower = Tower;
//# sourceMappingURL=tower.js.map