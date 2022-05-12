import { Component, OnInit, Input } from '@angular/core';
import { Node } from 'src/shared/node.model';

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.scss']
})
export class TodayViewComponent implements OnInit {
  @Input() all: Node[] = [];

  today: Node[] = []

  constructor() { }

  ngOnInit(): void {
    this.today = [];
    this.all.forEach(task => {
      if (new Date(task.reminder).getDay() == new Date().getDay()) {
        this.today.push(task);
      }
    });
  }

  // Friday, 15 April 2022
  date = new Date();
  todayString = "" + this.date.getDay() + ", " + this.date.getDate() + " " + this.date.getMonth() + " " + this.date.getFullYear();

}
