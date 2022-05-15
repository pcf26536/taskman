import { Injectable } from '@angular/core';
import { locale } from 'src/shared/data';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  dateObject: Date = new Date()

  public currentMonthNumber = this.dateObject.getMonth();

  public currentDayNumber = this.dateObject.getDay();

  public currentDate = this.dateObject.getDate();

  // today view
  public todayDateString = this.dateObject.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // reminder date string format
  reminderDateTimeString(reminder: number) {
    let date = new Date(reminder);
    return date.toLocaleDateString(
      locale, 
      { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }
    );
  }

  // edited date string
  editedDateTimeString(edited: number) {
    let str = '';
    let date = new Date(edited);
    if (date.getDate() == this.currentDate) {
      str = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    } else if (date.getDate() == this.currentDate - 1) {
      str = 'yesterday'
    }
    else {
      str = date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
    }
    return str;
  }

  reminderTimeString(reminder: number) {
    return (new Date(reminder)).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }

  reminderPassed(reminder: number) {
    return Date.now() > reminder;
  }

  constructor() { }

  // calender view
  public longMonthName = this.dateObject.toLocaleDateString(locale, { month: 'long' });

  public currentYear = this.dateObject.getFullYear();

  getShortWeekDays()
  {
      var baseDate = new Date(Date.UTC(2022, 4, 9)) // Monday 9th May 2022
      var weekDays = [];
      for(let i = 0; i < 7; i++)
      {       
          weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'short' }));
          baseDate.setDate(baseDate.getDate() + 1);       
      }
      return weekDays;
  }

  public shorWeekDays = this.getShortWeekDays();

  public rows = 5;
  
  public columns = 7;

  getDaysInMonth(month: number) {
    return new Date(this.currentYear, month + 1, 0).getDate();
  }
  
  createDaysForCurrentMonth() {
    console.log(this.currentMonthNumber);
    return [...Array(this.getDaysInMonth(this.currentMonthNumber))].map((day, index) => {
      return {
        date: new Date(this.currentYear, this.currentMonthNumber, index + 2).toISOString().split('T')[0],
        dayOfMonth: index + 1,
        isCurrentMonth: true
      };
    });
  }
  
  public currentMonthDays = this.createDaysForCurrentMonth();
  
  // previous month operations
  getWeekday(date: string) {
    return new Date(date).getDay();
  }

  subtractMonths(numOfMonths: number, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
  
    return date;
  }

  addMonths(numOfMonths: number, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);
  
    return date;
  }

  createDaysForPreviousMonth() {
    const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
    console.log(firstDayOfTheMonthWeekday);

    const previousMonth = this.subtractMonths(1, new Date(this.currentMonthDays[0].date));
  
    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

    let d =  new Date(this.currentMonthDays[0].date);
    d.setDate(d.getDate() - visibleNumberOfDaysFromPreviousMonth);
    const previousMonthLastMondayDayOfMonth = parseInt(d.toISOString().split('-')[2].substring(0,2));
    

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      return {
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonthLastMondayDayOfMonth + index + 1).toISOString().split('T')[0],
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
  }

  createDaysForNextMonth() {
    const lastDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[this.currentMonthDays.length-1].date);
    console.log(lastDayOfTheMonthWeekday);
  
    const nextMonth = this.addMonths(1, new Date(this.currentMonthDays[0].date));
  
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;
  
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), index + 2).toISOString().split('T')[0],
        dayOfMonth: index + 1,
        isCurrentMonth: false
      };
    });
  }

  private previousMonthDays: any = this.createDaysForPreviousMonth();

  private nextMonthDays: any = this.createDaysForNextMonth();

  public days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];

}
