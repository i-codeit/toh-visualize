/**
 * Interface serving as a data format contract between the client and the server
 */
export interface EventInterface {
    blockId: number;
    towerFrom: string;
    towerTo: string;
}