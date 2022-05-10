import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';

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

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
