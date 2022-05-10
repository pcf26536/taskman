import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() taskModal: boolean = false;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
