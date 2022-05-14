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

  search = new Search('');

  input: boolean = false;

  constructor(public navigationService: NavigationService, private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  searchTasks() {
    this.input = true;
    this.tasksService.carsQuerySubject.next(this.search.phrase);
  }

  clearSearch() {
    this.navigationService.switchView(1);
    this.search.phrase = '';
    this.input = false;
  }

}
