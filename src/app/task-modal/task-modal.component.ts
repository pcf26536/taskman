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

  shadowCopy: Node = this.selectedTask;


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

  selectedNoteEdit() {
    this.selectedTask.edited = Date.now();
  }

  newNoteEdit() {
    this.taskModel.edited = Date.now();
  }

  formAction() {
    // close modal
    this.modalService.toggleModal(modalTypes.all);

    if ( // if input/task values have changed (expand the values)
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description ||
      this.taskModel.incomplete.length != this.changeModel.incomplete.length ||
      this.taskModel.complete.length != this.changeModel.complete.length ||
      JSON.stringify(this.taskModel.incomplete) != JSON.stringify(this.changeModel.incomplete) ||
      JSON.stringify(this.taskModel.complete) != JSON.stringify(this.changeModel.complete)
      // [pinned and reminder cannot soley define a task] - anyways, they have handling functions below
    ) {
      this.taskModel.created = Date.now();
      this.newNoteEdit();
      this.tasksService.addTask(this.taskModel);
      // when a task is created
      this.tasksService.refreshReminderTimeouts(this.taskModel.reminder);
    }

    else if ( // if input/task values have changed (expand the values)
      this.selectedTask.title != this.shadowCopy.title || 
      this.selectedTask.description != this.shadowCopy.description
    ) {
      this.selectedNoteEdit();
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
      this.newNoteEdit();
    }
    else { // (this.editMode == modalToggleStates.edit)
      this.selectedTask.reminder = value;
      this.selectedNoteEdit();
    }
    // if reminder is deleted or reminder edited or task is deleted or task is restored => hook reminder service
    this.tasksService.refreshReminderTimeouts(value);
  }

  deleteFromModal() {
    // close modal
    this.modalService.toggleModal(modalTypes.all);
    if (this.editMode == modalToggleStates.create) {
      if ( // if input/task values have changed (NEEED TO expand the values)
        this.taskModel.title != this.changeModel.title || 
        this.taskModel.description != this.changeModel.description
      ) {
        this.tasksService.addTask(this.taskModel); // save the task and
        this.tasksService.deleteTask(this.taskModel); // delete the new task
      }
    }
      // delete selected task
    else if (this.editMode == modalToggleStates.edit || this.editMode == modalToggleStates.view) {
      if ( // check if changes happened
      this.selectedTask.title != this.shadowCopy.title || 
      this.selectedTask.description != this.shadowCopy.description
      ) {
        this.selectedNoteEdit();
      }
      this.tasksService.deleteTask(this.selectedTask);
      this.tasksService.refreshReminderTimeouts(this.selectedTask.reminder);
    }

  }

  deleteReminder() {
    // refresh reminder timeouts
    let reminder = 0;
    if (this.editMode == modalToggleStates.create) {
      reminder = this.taskModel.reminder;
      this.taskModel.reminder = 0;
      this.newNoteEdit();
    }
    else { // (this.editMode == modalToggleStates.edit)
      reminder = this.selectedTask.reminder;
      this.selectedTask.reminder = 0;
      this.selectedNoteEdit();
    }
    // if reminder is deleted or reminder edited or task is deleted or task is restored => hook reminder service
    this.tasksService.refreshReminderTimeouts(reminder);
    this.notificationService.showReminderDeleteNotification();
  }

  pinToggle() {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.pinned = !this.taskModel.pinned; 
      this.newNoteEdit();
    }
    else { // or edit (view - pin is not shown)
      this.tasksService.pinToggle(this.selectedTask);
      this.selectedNoteEdit();
    }
  }

  // list item logic includes the specific items list
  markItem(index: number) {
    // only items in incomplete list are marked
    console.log(index);
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.complete.unshift(this.taskModel.incomplete.splice(index, 1)[0]);
      this.newNoteEdit();
    }
    else { // or edit (view)
      this.selectedTask.complete.unshift(this.selectedTask.incomplete.splice(index, 1)[0]);
      this.selectedNoteEdit();
    }
  }

  unMarkItem(index: number) {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.incomplete.unshift(this.taskModel.complete.splice(index, 1)[0]);
      this.newNoteEdit();
    }
    else { // or edit (view)
      this.selectedTask.incomplete.unshift(this.selectedTask.complete.splice(index, 1)[0]);
      this.selectedNoteEdit();
    }
  }

  addItem(event: any) {
    this.listItem.value = ''; // clear new item input
    let newItem = event.target.value;
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.incomplete.unshift(newItem);
      this.newNoteEdit();
    }
    else { // or edit (view): no button
      this.selectedTask.incomplete.unshift(newItem);
      this.selectedNoteEdit();
    }
    event.preventDefault();
  }

  removeItem(index: number) {
    if (this.editMode == modalToggleStates.create) {
      this.taskModel.complete.splice(index, 1);
      this.newNoteEdit();
    }
    else { // or edit (view)
      this.selectedTask.complete.splice(index, 1);
      this.selectedNoteEdit();
    }
  }

}
