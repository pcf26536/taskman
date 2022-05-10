import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // modals
  private taskModal = new BehaviorSubject(false);
  sharedTaskModal = this.taskModal.asObservable();

  private reminderModal = new BehaviorSubject(false);
  sharedReminderModal = this.reminderModal.asObservable();

  constructor() { }

  // next modal states
  nextTaskModalState(taskModal: boolean) {
    this.taskModal.next(taskModal);
  }

  nextReminderModalState(reminderModal: boolean) {
    this.reminderModal.next(reminderModal);
  }

  toggleModal(mode: number) {
    /* MODES
    1: Text Task Modal (Create)
    2: List Task Modal (Create)
    3: Reminder Modal (create)
    4: Reminder Modal (Edit)
    5: Text Task Modal (Edit/view)
    6: List Task Modal (Edit/view)
    7: Close All*/

    switch(mode) {
      case 5: {
        this.taskModal.next(true);
        // pass task values
        // activate description div
        break;
      }
      case 1: {
        this.taskModal.next(true);
        // activate description div
        break;
      }
      case 4: {
        this.reminderModal.next(true);
        // pass reminder values
        break;
      }
      case 3: {
        this.reminderModal.next(true);
        break;
      }
      case 6: {
        this.taskModal.next(true);
        // pass list item values
        // activate list items div
        break;
      }
      case 2: {
        this.taskModal.next(true);
        // activate list items div
        break;
      }
      case 7: {
        this.taskModal.next(false);
        this.reminderModal.next(false);
        break;
      }
    }
  }

}
