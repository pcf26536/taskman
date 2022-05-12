import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/shared/navigation.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() allTasks: boolean = true;

  @Input() todayView: boolean = false;

  @Input() calenderView: boolean = false;

  @Input() trashView: boolean = false;

  @Input() searchResults: boolean = false;

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  requestView(viewNumber: number) {
    this.navigation.switchView(viewNumber);
  }

}
