import { Component, OnInit } from '@angular/core';
import { Search } from 'src/shared/search.model';
import { NavigationService } from 'src/shared/navigation.service';
import { TasksService } from '../../shared/tasks.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  search = new Search('')

  constructor(public navigationService: NavigationService, private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  searchTasks() {
    this.navigationService.switchView(5);
    this.tasksService.carsQuerySubject.next(this.search.phrase);
  }

}
