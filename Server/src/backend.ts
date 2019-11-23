import { EventInterface } from "./eventInterface";

export function towerOfHanoi(lenSrc: number, srcTower: string, destTower: string, auxTower: string, data: EventInterface[]) {
    // Base cases when length is 0 or 1
    if (lenSrc === 0) {
        return;
    }
    else if (lenSrc === 1) {
        data.push({blockId: lenSrc, towerFrom: srcTower, towerTo: destTower});
        return;
    }

    towerOfHanoi(lenSrc - 1, srcTower, auxTower, destTower, data);
    data.push({blockId: lenSrc, towerFrom: srcTower, towerTo: destTower});
    towerOfHanoi(lenSrc - 1, auxTower, destTower, srcTower, data);
}