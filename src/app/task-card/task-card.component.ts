import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { TasksService } from '../tasks.service';
import { Node } from '../node.model';
import { taskTypes } from 'src/shared/data';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  // task card inputs
  @Input() taskTitle: string = '';
  @Input() pinnedStatus: boolean = false;
  @Input() description: string = '';

  @Input() task: Node = new Node(taskTypes.text);

  constructor(public modalService: ModalService, public tasksService: TasksService) { }

  ngOnInit(): void {
  }

}
