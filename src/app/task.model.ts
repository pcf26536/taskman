export interface Task {
    /*
    id: number (created time)
    type: text or list (string)
    title: (string) - max 256 characters
    description: for a text task - max?
    complete: if type == list, which list items are complete [string array]
    incomplete: if type == list, which list items are incomplete [string array]
    reminder: datetime number
    pinned: true/false (boolean)
    edited: datetime number
    created: datetime number
    trashed: true/false (boolean)
    done: true/false (boolean)
    */

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
}
