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
  public dateString = this.dateObject.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor() { }

  // calender view
  public longMonthName = this.dateObject.toLocaleDateString(locale, { month: 'long' });

  public currentYear = this.dateObject.getFullYear();

  getShortWeekDays()
  {
      var baseDate = new Date(Date.UTC(2022, 4, 8)) // Sunday 8th May 2022
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
  
  //public currentMonthDays = this.getDaysInMonth(this.currentMonthNumber);

  public previousMonthDays = this.getDaysInMonth(this.currentMonthNumber - 1);

  public nextMonthDays = this.getDaysInMonth(this.currentMonthNumber + 1);

  createDaysForCurrentMonth() {
    return [...Array(this.getDaysInMonth(this.currentMonthNumber))].map((day, index) => {
      return {
        date: (new Date(`${this.currentYear}-${this.currentMonthNumber}-${index + 1}`)).toISOString().split('T')[0],
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

  createDaysForPreviousMonth() {
    const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
  
    const previousMonth = new Date(`${this.currentYear}-${this.getDaysInMonth(this.currentMonthNumber - 1)}-01`);
  
    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;


    const previousMonthLastMondayDayOfMonth = new Date(this.currentMonthDays[0].date.substring(0,7) + `${parseInt(this.currentMonthDays[0].date.substring(8,9)) - visibleNumberOfDaysFromPreviousMonth}`).getDate();
  
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      return {
        date: new Date(
          `${previousMonth.getFullYear()}-${previousMonth.getMonth() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).toISOString().split('T')[0],
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
  }

}
