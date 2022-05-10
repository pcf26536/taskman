import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreateTaskFieldComponent } from './create-task-field/create-task-field.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { NotificationComponent } from './notification/notification.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { ReminderModalComponent } from './reminder-modal/reminder-modal.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { TrashBarComponent } from './trash-bar/trash-bar.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TodayViewComponent } from './today-view/today-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { TrashViewComponent } from './trash-view/trash-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    CreateTaskFieldComponent,
    TaskModalComponent,
    NotificationComponent,
    TaskCardComponent,
    ReminderModalComponent,
    BackdropComponent,
    TrashBarComponent,
    TaskViewComponent,
    TodayViewComponent,
    CalendarViewComponent,
    TrashViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
