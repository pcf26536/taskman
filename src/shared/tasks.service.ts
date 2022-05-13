import { Injectable } from '@angular/core';
import { modalToggleStates, preloadedTasks } from 'src/shared/data';
import { LinkedList } from './linked-list.model';
import { BehaviorSubject, Observable, asapScheduler, scheduled, of , Subject} from "rxjs";
import { Node } from './node.model';
import { taskTypes } from 'src/shared/data';
import { NotificationService } from 'src/shared/notification.service';
import { notificationTypes } from 'src/shared/data';
import { map } from 'rxjs/operators';

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

  constructor(private notificationService: NotificationService) {
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


   // live task management functions
   deleteFromPinnedList(task: Node) {
    this.pinned.deleteNode(task);
    this.pinnedList.next(this.pinned);
   }

   deleteFromOthersList(task: Node) {
    this.others.deleteNode(task);
    this.othersList.next(this.others)
   }

   deleteFromTrashList(task: Node) {
    this.trash.deleteNode(task);
    this.trashList.next(this.trash);
   }

   addToPinnedList(task: Node) {
    this.pinned.insertInBegin(
      task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
    );
    this.pinnedList.next(this.pinned);
   }

   addToOthersList(task: Node) {
    this.others.insertInBegin(
      task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
    );
    this.othersList.next(this.others);
   }
   // live task management functions


  deleteTask(task: Node) {
    
    if (task.trashed) { // delete from trash list (permanently)
      this.deleteFromTrashList(task);
      return; // no need to set trashed flag (end the funciton)
    }

    if (task.pinned && !task.trashed) { // delete from pinned list
      this.deleteFromPinnedList(task);
    }

    if (!task.pinned && !task.trashed) { // delete from others list
      this.deleteFromOthersList(task);
    }

    // set trashed flag = true
    task.trashed = true;
    this.addTask(task);

    // show notification
    this.notificationService.showNotification(notificationTypes.deleteTask);
  }

  // restore task logic
  restoreTask(task: Node) {
    // delete from trashed list
    this.deleteFromTrashList(task);
    // set trashed flag = false
    task.trashed = false;
    
    if (task.pinned) { // add to pinned list
      this.addToPinnedList(task);
    }

    if (!task.pinned) { // add to others list
      this.addToOthersList(task);
    }

    // show notification
    this.notificationService.showNotification(notificationTypes.restoreTask);
  }

  addTask(task: Node) {
    
    if (task.trashed) { // insert to trash list
    this.trash.insertInBegin(
        task.type, task.title, task.edited, task.created, task.id, task.description, task.complete, task.incomplete, task.reminder, task.pinned, task.trashed, task.done
      );
      this.trashList.next(this.trash);
    }

    if (task.pinned && !task.trashed) { // insert to pinned list
      this.addToPinnedList(task);
    }

    if (!task.pinned && !task.trashed) { // insert to others list
      this.addToOthersList(task);
    }

  }

  pinToggle(task: Node) {
    if (task.pinned) {
      // remove from pinned list
      this.deleteFromPinnedList(task);
      // task.pinned = false;
      task.pinned = false;
      // add to others list
      this.addToOthersList(task);
    }
    else {
      // remove from others list
      this.deleteFromOthersList(task);
      // task.pinned = true;
      task.pinned = true;
      // add to pinned list
      this.addToPinnedList(task);
    }
  }

  public carsQuerySubject = new Subject<string>();

  loadMatches(query: string): Observable<Node[]> {
    let all = [...this.pinned.traverse(), ...this.others.traverse()];
    return of(all, asapScheduler).pipe(
      map(all => all.filter(task => task.description.includes(query)))
    );
  }
   
}
