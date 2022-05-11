import { Component, OnInit } from '@angular/core';
import { Search } from '../search.model';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  search = new Search('')

  constructor(public navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  searchTasks(object: any) {

  }

  changeView() {

  }

}
