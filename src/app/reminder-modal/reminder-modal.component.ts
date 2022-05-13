import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/shared/modal.service';
import { Reminder } from 'src/shared/reminder.model';
import { ReminderService } from 'src/shared/reminder.service';
import { modalTypes } from 'src/shared/data';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss']
})
export class ReminderModalComponent implements OnInit {

  // read reminder value input

  // compute date/time field values

  // Output event emitter (on select reminder date time)
  @Output() addReminderEvent = new EventEmitter<string>();
  
  reminderModal: boolean = false;

  // values limitation (constraints)
  // reminder > date.now()

  reminderModel = new Reminder('', '');

  constructor(public modalService: ModalService, public reminderService: ReminderService) { }

  ngOnInit(): void {
    this.modalService.sharedReminderModal.subscribe(value=> this.reminderModal = value);
  }

  addReminder() {
    if (this.reminderModel.date && this.reminderModel.time)
      this.addReminderEvent.emit(this.reminderModel.date + " " + this.reminderModel.time);
    this.modalService.toggleModal(modalTypes.reminder);
  }

}
