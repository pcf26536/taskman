import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { notificationTypes } from './data';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    // show notification flag
    private notify = new BehaviorSubject(false);
    sharedNotify = this.notify.asObservable();

    nextNotifyStatus(notify: boolean) {
      this.notify.next(notify);
    }

    // notification object
    private notificationObj = new BehaviorSubject({message: '', action: null});
    sharedNotificationObj = this.notificationObj.asObservable();

    taskDeleteMsg: string = 'Task deleted';
    restoreMsg: string = 'Task restored';
    reminderDeleteMsg: string = 'Reminder deleted';
    undoMsg: string = 'Action undone';

    closeNotification() {
      this.notify.next(false);
    }

    hideNotification() {
      setTimeout(() => {this.closeNotification();}, 5000);
    }

    showNotification(type: string) {
      switch (type) {
        case notificationTypes.deleteReminder : {
          this.notificationObj.next({message: this.reminderDeleteMsg, action: null});
          break;
        }
        case notificationTypes.deleteTask : {
          this.notificationObj.next({message: this.taskDeleteMsg, action: null});
          break;
        }
        case notificationTypes.restoreTask : {
          this.notificationObj.next({message: this.restoreMsg, action: null});
          break;
        }
        case notificationTypes.undo : {
          this.notificationObj.next({message: this.undoMsg, action: null});
          break;
        }
      }
      this.notify.next(true);
      this.hideNotification();
    }

    showReminderDeleteNotification() {
      // show notification
      this.showNotification(notificationTypes.deleteReminder);
    }

  constructor() { }
}
