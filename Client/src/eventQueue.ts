import { EventInterface } from "./eventInterface";

/**
 * This class catches all the events from the server and saves it in the queue
 * The queue is then used by the physics engine
 */
export class EventQueue {
    private events: EventInterface[];
    private currentEvent: EventInterface;

    constructor() {
        this.events = new Array<EventInterface>();
        this.currentEvent = {
            blockId: -1,
            towerFrom: "",
            towerTo: ""
        }
    }

    public pushEvent(event: EventInterface) {
        this.events.push(event);
    }

    public isEmpty() {
        if(this.events.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    public popEvent() {
        if(!this.isEmpty()) {
            this.currentEvent = this.events.shift()!;
        } 
    }

    public getCurrentEvent() {
        return this.currentEvent;
    }
}