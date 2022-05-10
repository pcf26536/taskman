import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { taskTypes } from 'src/shared/data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // modals
  private taskModal = new BehaviorSubject(false);
  sharedTaskModal = this.taskModal.asObservable();

  private reminderModal = new BehaviorSubject(false);
  sharedReminderModal = this.reminderModal.asObservable();

  // task type update
  private selectedType = new BehaviorSubject(taskTypes.text);
  sharedSelectedType = this.selectedType.asObservable();

  constructor() { }

  // next modal states
  nextTaskModalState(taskModal: boolean) {
    this.taskModal.next(taskModal);
  }

  nextReminderModalState(reminderModal: boolean) {
    this.reminderModal.next(reminderModal);
  }

  // selected task type
  nextSelectedType(selectedType: string) {
    this.selectedType.next(selectedType);
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
        this.selectedType.next(taskTypes.text);
        break;
      }
      case 1: {
        this.taskModal.next(true);
        // activate description div
        this.selectedType.next(taskTypes.text);
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
        this.selectedType.next(taskTypes.list);
        break;
      }
      case 2: {
        this.taskModal.next(true);
        // activate list items div
        this.selectedType.next(taskTypes.list);
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
