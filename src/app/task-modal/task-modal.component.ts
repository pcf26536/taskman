import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Node } from '../node.model'; 
import { taskTypes } from 'src/shared/data';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() taskModal: boolean = false;
  @Input() selectedType: string = taskTypes.text;

  types: any = taskTypes;

  changeModel = new Node(this.selectedType);
  taskModel = new Node(this.selectedType);

  constructor(public modalService: ModalService, public tasksService: TasksService) { }

  ngOnInit(): void {
  }

  formAction() {
    // close modal
    this.modalService.toggleModal(7);

    if ( // if input/task values have changed
      this.taskModel.title != this.changeModel.title || 
      this.taskModel.description != this.changeModel.description
    ) {
      this.tasksService.addTask(this.taskModel);
    }
    
  }

}
