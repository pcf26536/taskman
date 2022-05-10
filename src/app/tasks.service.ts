import { Injectable } from '@angular/core';
import { preloadedTasks } from 'src/shared/data';
import { LinkedList } from './linked-list.model';
import { BehaviorSubject } from "rxjs";
import { Node } from './node.model';

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

   public pinnedList = new BehaviorSubject(new LinkedList());
   sharedPinnedList = this.pinnedList.asObservable();

   public othersList = new BehaviorSubject(new LinkedList());
   sharedOthersList = this.othersList.asObservable();

   public trashList = new BehaviorSubject(new LinkedList());
   sharedTrashList = this.trashList.asObservable();

   preloadTasks() {
    preloadedTasks.forEach(task => {
      // insert proloaded tasks into specific list
      if (task.pinned && !task.trashed) 
      this.pinned.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.done);

      if (!task.pinned && !task.trashed)
      this.others.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.done);
      
      if(task.trashed)
      this.trash.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.done);
    });

    this.pinnedList.next(this.pinned);
    this.othersList.next(this.others);
    this.trashList.next(this.trash);
   }


   nextPinnedList(pinned: LinkedList) {
    this.pinnedList.next(pinned);
    }

   addTask(task: Node) {
    this.pinned.insertInBegin(task.type, task.title, task.edited, task.created, Date.now(), task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.done);
    //this.pinnedList.next(this.pinned);
    this.nextPinnedList(this.pinned);
    //console.log(task.description);
    //console.log(this.pinned.size());
   }

   deleteTask() {
     
   }

   
}
