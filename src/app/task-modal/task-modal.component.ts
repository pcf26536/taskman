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
import { ListItem } from '../../shared/list-item.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() taskModal: boolean = false;
  
  @Input() selectedTask = new Node(taskTypes.text);

  types: any = taskTypes;
  
  selectedTaskType = taskTypes.text;

  changeModel: Node = new Node(taskTypes.text);
  taskModel = new Node(taskTypes.text);

  modes: any = modalToggleStates;

  editMode: string = modalToggleStates.create;

  listItem = new ListItem('');


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
    this.tasksService.sharedSelectedType.subscribe(value=> {
      this.selectedTaskType = value;
      this.changeModel = new Node(value);
      this.taskModel = new Node(value);
    });
  }

  formAction() {
    // close modal
    this.modalService.toggleModal(modalTypes.all);

    if ( // if input/task values have changed (expand the values)
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description ||
      this.taskModel.incomplete.length != this.changeModel.incomplete.length ||
      this.taskModel.complete.length != this.changeModel.complete.length
      // this.taskModel.pinned != this.changeModel.pinned ||
      //this.taskModel.reminder != this.changeModel.reminder
    ) {
      console.log(this.taskModel.type);
      this.tasksService.addTask(this.taskModel);
      // when a task is created
      this.tasksService.refreshReminderTimeouts(this.taskModel.reminder);
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

  markItem(index: number) {
    console.log(index);
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.complete.unshift(this.taskModel.incomplete.splice(index, 1)[0]);
    }
    else { // or edit (view)
      this.selectedTask.complete.unshift(this.selectedTask.incomplete.splice(index, 1)[0]);
    }
  }

  unMarkItem(index: number) {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.incomplete.unshift(this.taskModel.complete.splice(index, 1)[0]);
    }
    else { // or edit (view)
      this.selectedTask.incomplete.unshift(this.selectedTask.complete.splice(index, 1)[0]);
    }
  }

  addItem(event: any) {
    this.listItem.value = '';
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.incomplete.unshift(event.target.value);
    }
    else { // or edit (view): wont happen for now cause no item delete
      
    }
    event.preventDefault();
  }

  removeItem(index: number) {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.complete.splice(index, 1);
    }
    else { // or edit (view)
      this.selectedTask.complete.splice(index, 1);
    }
  }

}
