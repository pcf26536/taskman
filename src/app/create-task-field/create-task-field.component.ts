import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/shared/modal.service';
import { modalToggleStates } from 'src/shared/data';
import { modalTypes } from 'src/shared/data';
import { taskTypes } from 'src/shared/data';

@Component({
  selector: 'app-create-task-field',
  templateUrl: './create-task-field.component.html',
  styleUrls: ['./create-task-field.component.scss']
})
export class CreateTaskFieldComponent implements OnInit {
  modalState: string = modalToggleStates.create;
  modalType: string = modalTypes.task;
  taskType: string = taskTypes.list;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
