import { Task } from "./task.model";

export class Node implements Task {
    id: number;
    type: string;
    title: string;
    description: string;
    complete: string[];
    incomplete: string[];
    reminder: number;
    pinned: boolean;
    edited: number;
    created: number;
    //trashed: boolean;
    done: boolean;
    next:Node|null;
    prev:Node|null;

    constructor(
        // required attributes
        type: string, 
        // not required (defaults) 
        title: string = '', edited: number =  Date.now(), created: number =  Date.now(), id: number =  Date.now(), 
        description: string = '', complete: string[] = [], incomplete: string[] = [], 
        reminder: number = 0, 
        pinned: boolean = false, done: boolean = false
        ) {
        // task attributes
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.complete = complete;
        this.incomplete = incomplete;
        this.reminder = reminder;
        this.pinned = pinned;
        this.edited = edited;
        this.created = created;
        //this.trashed = trashed;
        this.done = done;
        // node attributes
        this.next = null;
        this.prev = null;
    }
}
