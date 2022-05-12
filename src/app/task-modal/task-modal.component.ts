import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/shared/modal.service';
import { Node } from 'src/shared/node.model';
import { taskTypes } from 'src/shared/data';
import { TasksService } from '../../shared/tasks.service';
import { modalTypes } from 'src/shared/data';
import { modalToggleStates } from 'src/shared/data';
import { CalendarService } from 'src/shared/calendar.service';

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
    public calendarService: CalendarService) { }

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

    if ( // if input/task values have changed
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description
    ) {
      this.tasksService.addTask(this.taskModel);
    }
    
  }

}
