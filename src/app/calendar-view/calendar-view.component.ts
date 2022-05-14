import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from 'src/shared/calendar.service';
import { Node } from 'src/shared/node.model';
import { ModalService } from 'src/shared/modal.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  @Input() all: Node[] = [];

  reminder: Node[] = []

  constructor(public calendarService: CalendarService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.all.forEach(task => {
      if(task.reminder) {
          this.reminder.push(task);
          console.log(new Date(task.reminder + 86400000).toISOString().split('T')[0])
      }
    });
  }

  dateMatch(date: string, reminder: number) {
    return (new Date(reminder + 86400000)).toISOString().split('T')[0] == date;
  }

}
