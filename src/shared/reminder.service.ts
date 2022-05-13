import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { locale } from './data';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private calendarService: CalendarService) { }

  reminderInMilliseconds(dateTime: string) {
    let dateobj = new Date(dateTime);
    return dateobj.getTime(); // 59 seconds (max 59000ms gap without seconds)
  }

  generateReminderMessage(reminder: number, title: string, description: string = '', incomplete: string[] = []){
    let middot = ' · ';
    let date = new Date(reminder);
    let tail: string = description ? description.substring(0,31) + '...' : incomplete[0] + middot + incomplete[1] + middot + incomplete[2] + ' +' + (incomplete.length - 3) + ' more'; 
    return date.toLocaleDateString(locale, { weekday: 'long'}) + ', ' 
    + date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) 
    + ' - ' + title + tail;
  }
}
