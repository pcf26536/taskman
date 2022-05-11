import { Node } from "./node.model";

export class LinkedList {
    head:Node|null = null

    constructor() {
        this.head = null;
    }

    public insertAtEnd(
        type: string, title: string, edited: number, created: number,
        id: number, description: string, complete: string[], incomplete: string[], 
        reminder: number, pinned: boolean, trashed: boolean, done: boolean
        ): Node {
        const node = new Node(type, title, edited, created, id, description, complete, incomplete, reminder, pinned, trashed, done);
        if (!this.head) {
          this.head = node;
        } else {
          const getLast = (node: Node): Node => {
            return node.next ? getLast(node.next) : node;
          };
    
          const lastNode = getLast(this.head);
          node.prev = lastNode;
          lastNode.next = node;
        }
        return node;
      }

    
    public insertInBegin(type: string, title: string, edited: number, created: number,
        id: number, description: string, complete: string[], incomplete: string[], 
        reminder: number, pinned: boolean, trashed: boolean, done: boolean): Node {
        const node = new Node(type, title, edited, created, id, description, complete, incomplete, reminder, pinned, trashed, done);
        if (!this.head) {
          this.head = node;
        } else {
          this.head.prev = node;
          node.next = this.head;
          this.head = node;
        }
        return node;
    }

    public deleteNode(node: Node): void {
        if (!node.prev) {
          this.head = node.next;
        } else {
          const prevNode = node.prev;
          prevNode.next = node.next;
        }
    }

    /*public search(comparator: (value: number) => boolean): Node | null {
        const checkNext = (node: Node): Node | null => {
          if (comparator(node.value)) {
            return node;
          }
          return node.next ? checkNext(node.next) : null;
        };
    
        return this.head ? checkNext(this.head) : null;
    }*/

    public traverse(): Node[] {
        const array: Node[] = [];
        if (!this.head) {
          return array;
        }
    
        const addToArray = (node: Node): Node[] => {
          array.push(node);
          return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
      }
    
      public size(): number {
        return this.traverse().length;
      }
    
}
