import { UIObjects } from "./ui-objects";
import { EventQueue } from "./eventQueue";
import { EventInterface } from "./eventInterface";

export class Physics {
    private percent: number;
    private direction: number;
    private ui: UIObjects;
    private eq: EventQueue;
    private currentEvent: EventInterface;
    private update: boolean;

    constructor(
        ui: UIObjects,
        eq: EventQueue
    ) {
        this.ui = ui;
        this.eq = eq;
        this.percent = 0;
        this.direction = 1;
        this.currentEvent = {
            blockId: -1,
            towerFrom: "",
            towerTo: ""
        };
        this.update = true;
    }

    public animate(deltaTime: number): void {
        // check for updated event
        if (this.isEventUpdated()) {
            this.currentEvent = this.eq.getCurrentEvent();
            this.percent = 0;
            this.direction = 1;
            this.update = true;
        }

        if (
            this.currentEvent.blockId !== -1
            && this.currentEvent.towerFrom !== ""
            && this.currentEvent.towerTo !== ""
        ) {
            // set the animation position (0-100)
            this.percent += this.direction;
            if (this.percent < 0) {
                this.percent = 0;
                this.direction = 1;
            };
            if (this.percent > 100) {
                this.percent = 100;
                this.direction = 0;

                // adjust the height of the towers
                this.adjustTowerHeight();

                // set update to false, so it doesn't animate in this iteration
                this.update = false;

                // Pop the queue to get next event
                this.eq.popEvent();
            };

            if(this.update)
                this.moveBlock(this.percent);
        }
    }

    public moveBlock(sliderValue: number): void {
        let ctx: CanvasRenderingContext2D = this.ui.getContext();
        let toTowerIndex: number = this.getTowerIndex(this.currentEvent.towerTo);

        // Current position of the block to move
        let currentPos = this.ui.getBlocks()[this.currentEvent.blockId].getPosition();

        // final position is the tower top position of the tower the block should move to
        let finalPos = this.ui.getTowers()[toTowerIndex].getTowerTopPosition();

        ctx.beginPath();
        ctx.moveTo(currentPos.x, currentPos.y);
        ctx.bezierCurveTo(
            currentPos.x - 20,
            currentPos.y - (0.3 * currentPos.y),
            finalPos.x + 20,
            currentPos.y - (0.3 * currentPos.y),
            finalPos.x, finalPos.y);

        // draw the tracking path
        let newPoints: { x: number, y: number } = { x: 0, y: 0 };

        if (sliderValue) {
            var percent = (sliderValue) / 100

            newPoints = this.getCubicBezierXYatPercent({
                x: currentPos.x,
                y: currentPos.y
            }, {
                x: currentPos.x - 20,
                y: currentPos.y - (0.3 * currentPos.y)
            }, {
                x: finalPos.x + 20,
                y: currentPos.y - (0.3 * currentPos.y)
            }, {
                x: finalPos.x,
                y: finalPos.y
            }, percent);
        }

        // set the new position of the block
        this.ui.getBlocks()[this.currentEvent.blockId].update(newPoints);
    }

    public adjustTowerHeight() {
        let toTowerIndex: number = this.getTowerIndex(this.currentEvent.towerTo);
        let fromTowerIndex: number = this.getTowerIndex(this.currentEvent.towerFrom);

        this.ui.getTowers()[fromTowerIndex].setTowerTopPosition(
            this.ui.getTowers()[fromTowerIndex].getTowerTopPosition().y + this.ui.getBlocks()[this.currentEvent.blockId].getRadiusY()
        );

        this.ui.getTowers()[toTowerIndex].setTowerTopPosition(
            this.ui.getTowers()[toTowerIndex].getTowerTopPosition().y - this.ui.getBlocks()[this.currentEvent.blockId].getRadiusY()
        );
    }

    public getTowerIndex(towerId: string): number {
        let towerIndex: number = -1;

        if(towerId == "A") {
            towerIndex = 0;
        } else if (towerId == "B") {
            towerIndex = 1;
        } else if (towerId == "C") {
            towerIndex = 2;
        }

        return towerIndex;
    }

    public isEventUpdated(): boolean {
        if (
            this.currentEvent.blockId === this.eq.getCurrentEvent().blockId
            && this.currentEvent.towerFrom === this.eq.getCurrentEvent().towerFrom
            && this.currentEvent.towerTo === this.eq.getCurrentEvent().towerTo
        ) {
            return false;
        }

        return true;
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