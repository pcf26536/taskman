import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    TrashBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
