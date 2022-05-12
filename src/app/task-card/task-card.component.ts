import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/shared/modal.service';
import { TasksService } from '../../shared/tasks.service';
import { Node } from 'src/shared/node.model';
import { taskTypes } from 'src/shared/data';
import { modalToggleStates } from 'src/shared/data';
import { modalTypes } from 'src/shared/data';
import { CalendarService } from 'src/shared/calendar.service';

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

  constructor(public modalService: ModalService, public tasksService: TasksService,
    public calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  viewOrEditModal(task: Node) {
    this.tasksService.nextSelectedCard(task); // set selected task
    this.mode = task.trashed ? modalToggleStates.view : modalToggleStates.edit;
    this.modalService.toggleModal(modalTypes.task, this.mode); // show modal
  }

  reminderPassed(reminder: number) {
    return Date.now() > reminder;
  }

}
