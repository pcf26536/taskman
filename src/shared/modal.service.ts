import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { taskTypes } from 'src/shared/data';
import { modalToggleStates } from 'src/shared/data';
import { modalTypes } from 'src/shared/data';
import { TasksService } from '../shared/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // modals
  private taskModal = new BehaviorSubject(false);
  sharedTaskModal = this.taskModal.asObservable();

  private reminderModal = new BehaviorSubject(false);
  sharedReminderModal = this.reminderModal.asObservable();

  constructor(private tasksService: TasksService) { }

  // next modal states
  nextTaskModalState(taskModal: boolean) {
    this.taskModal.next(taskModal);
  }

  nextReminderModalState(reminderModal: boolean) {
    this.reminderModal.next(reminderModal);
  }

  toggleModal(modalType: string, toggeState: string = modalToggleStates.close, taskType: string = taskTypes.text) {
    /* MODES
    1: Text Task Modal (Create)
    2: List Task Modal (Create)
    3: Reminder Modal (create)
    4: Reminder Modal (Edit)
    5: Text Task Modal (Edit/view)
    6: List Task Modal (Edit/view)
    7: Close All*/
    switch(modalType) {

      case modalTypes.reminder: { // reminder modal
        switch(toggeState) {
          case modalToggleStates.create : {
            this.reminderModal.next(true);
            break;
          }
          case modalToggleStates.edit : {
            this.reminderModal.next(true);
            break;
          }
          case modalToggleStates.close : {
            this.reminderModal.next(false);
            break;
          }
        }

        break;
      }

      case modalTypes.task: { // task modal
        switch(toggeState) {
          case modalToggleStates.create : {
            this.taskModal.next(true);
            // text or list task type from trigger
            this.tasksService.nextSelectedTaskType(taskType);
            this.tasksService.nextTaskModalMode(modalToggleStates.create);
            break;
          }
          case modalToggleStates.edit : {
            this.taskModal.next(true);
            // the task type is known from Node: type attribute
            this.tasksService.nextTaskModalMode(modalToggleStates.edit);
            break;
          }
          case modalToggleStates.view : {
            this.taskModal.next(true);
            // the task type is known from Node: type attribute
            this.tasksService.nextTaskModalMode(modalToggleStates.view);
            break;
          }
          // case view (trash) ???
          case modalToggleStates.close : {
            this.taskModal.next(false);
            this.reminderModal.next(false);
            break;
          }
        }

        break;
      }

      case modalTypes.all: { // close all modals
        this.taskModal.next(false);
        this.reminderModal.next(false);
        break;
      }
    }

  }

}
