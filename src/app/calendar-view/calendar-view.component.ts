import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/shared/calendar.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  constructor(public calendarService: CalendarService) { }

  ngOnInit(): void {
  }

}
