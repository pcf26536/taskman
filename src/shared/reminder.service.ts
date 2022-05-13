import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private calendarService: CalendarService) { }

  reminderInMilliseconds(dateTime: string) {
    let dateobj = new Date(dateTime);
    return dateobj.getTime(); // 59 seconds (max 59000ms gap without seconds)
  }
}
