import { Component } from '@angular/core';
import { NavigationService } from 'src/shared/navigation.service';
import { ModalService } from 'src/shared/modal.service';
import { TasksService } from '../shared/tasks.service';
import { taskTypes } from 'src/shared/data';
import { Node } from 'src/shared/node.model';

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
  
  // modal types
  taskModal: boolean = false;
  reminderModal: boolean = false;
  
  // selected task type (create)
  selectedTaskType: string = taskTypes.text;

  // selected task
  selectedTask = new Node('');
  

  constructor(private navigationService: NavigationService, private modalService: ModalService,
              private tasksService: TasksService) {
  }

  ngOnInit(): void {
    // navigation states
    this.navigationService.sharedAllTasks.subscribe(status=> this.allTasks = status);
    this.navigationService.sharedTodayView.subscribe(status=> this.todayView = status);
    this.navigationService.sharedCalenderView.subscribe(status=> this.calenderView = status);
    this.navigationService.sharedTrashView.subscribe(status=> this.trashView = status);
    this.navigationService.sharedSearchResults.subscribe(status=> this.searchResults = status);
    this.navigationService.sharedCreateTaskField.subscribe(status=> this.createTaskField = status);
    this.navigationService.sharedTrashBar.subscribe(status=> this.trashBar = status);
    // modal types
    this.modalService.sharedTaskModal.subscribe(status=> this.taskModal = status);
    this.modalService.sharedReminderModal.subscribe(status=> this.reminderModal = status);
    // task type (list/text)
    this.tasksService.sharedSelectedType.subscribe(value=> this.selectedTaskType = value);
    // selected task/card (view/edit)
    this.tasksService.sharedSelectedCard.subscribe(value=> this.selectedTask = value);
  }

}
