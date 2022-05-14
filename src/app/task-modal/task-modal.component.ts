import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/shared/modal.service';
import { Node } from 'src/shared/node.model';
import { taskTypes } from 'src/shared/data';
import { TasksService } from '../../shared/tasks.service';
import { modalTypes } from 'src/shared/data';
import { modalToggleStates } from 'src/shared/data';
import { CalendarService } from 'src/shared/calendar.service';
import { ReminderService } from 'src/shared/reminder.service';
import { NotificationService } from 'src/shared/notification.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() taskModal: boolean = false;
  @Input() selectedType: string = taskTypes.text;
  @Input() selectedTask = new Node(taskTypes.text);

  types: any = taskTypes;

  changeModel = new Node(this.selectedType);
  taskModel = new Node(this.selectedType);

  modes: any = modalToggleStates;

  editMode: string = modalToggleStates.create;

  constructor(public modalService: ModalService, public tasksService: TasksService, 
    public calendarService: CalendarService, public reminderService: ReminderService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    // selected task/card (view/edit)
    //this.tasksService.sharedSelectedCard.subscribe(value=> this.selectedTask = value);
    this.tasksService.sharedTaskModalMode.subscribe(value=> {
      this.editMode = value;
      if (value == modalToggleStates.edit || value == modalToggleStates.view) {
        //this.taskModel = this.selectedTask;
        //console.log(this.selectedTask.title);
      }
    });
  }

  formAction() {
    // close modal
    this.modalService.toggleModal(modalTypes.all);

    if ( // if input/task values have changed (expand the values)
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description // ||
      // this.taskModel.pinned != this.changeModel.pinned ||
      //this.taskModel.reminder != this.changeModel.reminder
    ) {
      this.tasksService.addTask(this.taskModel);
    }
    
  }

  toggleReminderModal() {
    let toggleState: string = modalToggleStates.create;
    if (
      (this.editMode == modalToggleStates.create && !this.changeModel.reminder) || 
    (this.editMode == modalToggleStates.edit && !this.selectedTask.reminder)
    ) {
      toggleState = modalToggleStates.create;
    }
    else if (
      (this.editMode == modalToggleStates.create && this.changeModel.reminder) || 
    (this.editMode == modalToggleStates.edit && this.selectedTask.reminder)
    ) {
      toggleState = modalToggleStates.edit;
    }
    this.modalService.toggleModal(modalTypes.reminder, toggleState);
  }

  updateReminder(dateTime: string) {
    let value = this.reminderService.reminderInMilliseconds(dateTime);
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.reminder = value;
    }
    else { // (this.editMode == modalToggleStates.edit)
      this.selectedTask.reminder = value;
    }
    // if reminder is deleted or reminder edited or task is deleted or task is restored => hook reminder service
    this.tasksService.refreshReminderTimeouts(value);
  }

  deleteFromModal() {
    // close modal
    this.modalService.toggleModal(modalTypes.all);

    /*if ( // if input/task values have changed (NEEED TO expand the values)
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description ||
      this.taskModel.pinned != this.changeModel.pinned ||
      this.taskModel.reminder != this.changeModel.reminder
    ) {
      this.tasksService.addTask(this.taskModel); // save the task and
      this.tasksService.deleteTask(this.taskModel); // delete the new task
    }
    // delete selected task
    if (this.selectedTask.title || this.selectedTask.description || this.selectedTask.reminder ) {
      this.tasksService.deleteTask(this.selectedTask);
    }*/

  }

  deleteReminder() {
    // refresh reminder timeouts
    let reminder = 0;
    if (this.editMode == modalToggleStates.create) {
      reminder = this.taskModel.reminder;
      this.taskModel.reminder = 0;
    }
    else { // (this.editMode == modalToggleStates.edit)
      reminder = this.selectedTask.reminder;
      this.selectedTask.reminder = 0;
    }
    // if reminder is deleted or reminder edited or task is deleted or task is restored => hook reminder service
    this.tasksService.refreshReminderTimeouts(reminder);
    this.notificationService.showReminderDeleteNotification();
  }

  pinToggle() {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.pinned = !this.taskModel.pinned; 
    }
    else { // or edit (view - pin is not shown)
      this.tasksService.pinToggle(this.selectedTask);
    }
  }

}
