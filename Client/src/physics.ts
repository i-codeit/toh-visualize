export function move(command: string): void {

}

// draw tracking rect at xy
function drawEllipse(point, color) {
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
function getCubicBezierXYatPercent(
    startPt: {x:number, y:number},
    controlPt1: {x:number, y:number},
    controlPt2: {x:number, y:number},
    endPt: {x:number, y:number},
    percent: number): {x: number, y:number} {
    var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
    var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
    return ({
        x: x,
        y: y
    });
}

// cubic helper formula at percent distance
function CubicN(pct: number, a: number, b: number, c: number, d: number) {
    var t2 = pct * pct;
    var t3 = t2 * pct;
    return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
}