import { Injectable } from '@angular/core';
import { modalToggleStates, preloadedTasks } from 'src/shared/data';
import { LinkedList } from './linked-list.model';
import { BehaviorSubject } from "rxjs";
import { Node } from './node.model';
import { taskTypes } from 'src/shared/data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  /* 3 linked lists */
  // 1. Pinned
  pinned = new LinkedList();
  // 2. Others
  others = new LinkedList();
  // 1. Trash
  trash = new LinkedList();

  constructor() {
    this.preloadTasks();
   }
  /* observable functions */
   public pinnedList = new BehaviorSubject(new LinkedList());
   sharedPinnedList = this.pinnedList.asObservable();

   public othersList = new BehaviorSubject(new LinkedList());
   sharedOthersList = this.othersList.asObservable();

   public trashList = new BehaviorSubject(new LinkedList());
   sharedTrashList = this.trashList.asObservable();

  // selected card/node
  private selectedCard = new BehaviorSubject(new Node(''));
  sharedSelectedCard = this.selectedCard.asObservable();

  nextSelectedCard(selectedCard: Node) {
    this.selectedCard.next(selectedCard);
  }

   // task type update
   private selectedTaskType = new BehaviorSubject(taskTypes.text);
   sharedSelectedType = this.selectedTaskType.asObservable()

  nextSelectedTaskType(selectedType: string) {
    this.selectedTaskType.next(selectedType);
  }

  // task modal mode
  private taskModalMode = new BehaviorSubject(modalToggleStates.create);
  sharedTaskModalMode = this.taskModalMode.asObservable()

  nextTaskModalMode(taskModalMode: string) {
    this.taskModalMode.next(taskModalMode);
  }

    /* service functions */
   preloadTasks() {
    preloadedTasks.forEach(task => {
      // insert proloaded tasks into specific list
      if (task.pinned && !task.trashed) 
      this.pinned.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done);

      if (!task.pinned && !task.trashed)
      this.others.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done);
      
      if(task.trashed)
      this.trash.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done);
    });

    this.pinnedList.next(this.pinned);
    this.othersList.next(this.others);
    this.trashList.next(this.trash);
   }

  deleteTask(task: Node) {
    
    if (task.trashed) { // delete from trash list (permanently)
      this.trash.deleteNode(task);
      this.trashList.next(this.trash);
      return; // no need to set trashed flag (end the funciton)
    }

    if (task.pinned && !task.trashed) { // delete from pinned list
      this.pinned.deleteNode(task);
      this.pinnedList.next(this.pinned);
    }

    if (!task.pinned && !task.trashed) { // delete from others list
      this.others.deleteNode(task);
      this.othersList.next(this.others)
    }

    // set trashed flag = true
    task.trashed = true;
    this.addTask(task);
  }

  addTask(task: Node) {
    
    if (task.trashed) { // insert to trash list
    this.trash.insertInBegin(
        task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
      );
      this.trashList.next(this.trash);
    }

    if (task.pinned && !task.trashed) { // insert to pinned list
      this.pinned.insertInBegin(
        task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
      );
      this.pinnedList.next(this.pinned);
    }

    if (!task.pinned && !task.trashed) { // insert to others list
      this.others.insertInBegin(
        task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
      );
      this.othersList.next(this.others);
    }

  }
   
}
