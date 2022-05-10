import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  @Input() reminderModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
