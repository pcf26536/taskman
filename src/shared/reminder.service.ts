import { Injectable } from '@angular/core';
import { locale } from './data';
import { Node } from './node.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { 
  }

  reminderInMilliseconds(dateTime: string) {
    let dateobj = new Date(dateTime);
    return dateobj.getTime(); // 59 seconds (max 59000ms gap without seconds)
  }

  computeReminderTimeout(reminder: number) {
    console.log(reminder - Date.now());
    return reminder - Date.now();
  }

  generateReminderMessage(task: Node){
    let middot = ' · ';
    let dashes = '...';
    let date = new Date(task.reminder);
    let tail: string = '';
    if (task.description) { 
      tail = (task.description.length > 31) ? task.description.substring(0,31) : task.description;
      tail += dashes;
    } else if (task.incomplete) {
      if (task.incomplete.length > 3) {
        tail = task.incomplete[0] + middot + task.incomplete[1] + middot + task.incomplete[2] + ' +' + (task.incomplete.length - 3) + ' more'
      } else {
        task.incomplete.forEach((item) => { tail = tail + item + middot });
      }
    } 
    return date.toLocaleDateString(locale, { weekday: 'long'}) + ', ' 
    + date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) 
    + ' - ' + task.title + ' - ' + tail;
  }

}
