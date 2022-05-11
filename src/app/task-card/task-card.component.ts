import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { TasksService } from '../tasks.service';
import { Node } from '../node.model';
import { taskTypes } from 'src/shared/data';
import { modalToggleStates } from 'src/shared/data';
import { modalTypes } from 'src/shared/data';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  // task card inputs ------ delete these
  @Input() taskTitle: string = '';
  @Input() pinnedStatus: boolean = false;
  @Input() description: string = '';

  @Input() task: Node = new Node(taskTypes.text);

  mode: any = modalToggleStates.edit;

  constructor(public modalService: ModalService, public tasksService: TasksService) { }

  ngOnInit(): void {
  }

  viewOrEditModal(task: Node) {
    this.tasksService.nextSelectedCard(task); // set selected task
    this.mode = task.trashed ? modalToggleStates.view : modalToggleStates.edit;
    this.modalService.toggleModal(modalTypes.task, this.mode); // show modal
  }

}
