import { Component } from '@angular/core';
import { NavigationService } from './navigation.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Man';

  // navigation shared states
  allTasks: boolean = true;
  todayView: boolean = false;
  calenderView: boolean = false;
  trashView: boolean = false;
  searchResults: boolean = false;
  createTaskField: boolean = true;
  trashBar: boolean = false;
  taskModal: boolean = false;
  reminderModal: boolean = false;

  constructor(private navigationService: NavigationService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.navigationService.sharedAllTasks.subscribe(status=> this.allTasks = status);
    this.navigationService.sharedTodayView.subscribe(status=> this.todayView = status);
    this.navigationService.sharedCalenderView.subscribe(status=> this.calenderView = status);
    this.navigationService.sharedTrashView.subscribe(status=> this.trashView = status);
    this.navigationService.sharedSearchResults.subscribe(status=> this.searchResults = status);
    this.navigationService.sharedCreateTaskField.subscribe(status=> this.createTaskField = status);
    this.navigationService.sharedTrashBar.subscribe(status=> this.trashBar = status);
    this.modalService.sharedTaskModal.subscribe(status=> this.taskModal = status);
    this.modalService.sharedReminderModal.subscribe(status=> this.reminderModal = status);
  }

}
