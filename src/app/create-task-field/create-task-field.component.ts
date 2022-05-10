import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-task-field',
  templateUrl: './create-task-field.component.html',
  styleUrls: ['./create-task-field.component.scss']
})
export class CreateTaskFieldComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
