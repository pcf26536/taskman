import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notify: boolean =  false;
  notificationObj: any =  {message: '', action: null};

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.sharedNotify.subscribe(value=> this.notify = value);
    this.notificationService.sharedNotificationObj.subscribe(value=> this.notificationObj = value);
  }

}
