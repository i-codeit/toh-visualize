import { EventInterface } from "./eventInterface";

/**
 * Recursive function which saves data (returns) in an array 
 * depicting the movement of blocks
 * @param lenSrc number of blocks
 * @param srcTower source Tower
 * @param destTower destination tower
 * @param auxTower auxilary tower
 * @param data array to save data in
 */
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