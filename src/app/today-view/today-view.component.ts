import { Component, OnInit, Input } from '@angular/core';
import { Node } from 'src/shared/node.model';
import { CalendarService } from 'src/shared/calendar.service';

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.scss']
})
export class TodayViewComponent implements OnInit {
  @Input() all: Node[] = [];

  today: Node[] = []

  constructor(public calendarService: CalendarService) { }

  ngOnInit(): void {
    this.today = [];
    this.all.forEach(task => {
      if(task.reminder) {
        if (new Date(task.reminder).getDay() == new Date().getDay()) {
          this.today.push(task);
        }
      }
    });
  }

}
