import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { LinkedList } from '../linked-list.model';
import { Node } from '../node.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  // navigation variables
  @Input() allTasks: boolean = true;
  @Input() todayView: boolean = false;
  @Input() calenderView: boolean = false;
  @Input() trashView: boolean = false;
  @Input() searchResults: boolean = false;
  @Input() createTaskField: boolean = true;
  @Input() trashBar: boolean = false;

  // task variables
  pinnedTasks: LinkedList = new LinkedList();
  pinned: Node[] = [];
  othersTasks: LinkedList = new LinkedList();
  others: Node[] = [];
  trashTasks: LinkedList = new LinkedList();
  trash: Node[] = [];
  // today tasks
  all: Node[] = [];

  constructor(private tasksService: TasksService) {  
  }

  ngOnInit(): void {
    this.tasksService.sharedPinnedList.subscribe(list => {
      this.pinnedTasks = list;
      this.pinned = this.pinnedTasks.traverse();
      this.all = [...this.pinned, ...this.others];
    });
    this.tasksService.sharedOthersList.subscribe(list => {
      this.othersTasks = list;
      this.others = this.othersTasks.traverse();
      this.all = [...this.pinned, ...this.others];
    });
    this.tasksService.sharedTrashList.subscribe(list => {
      this.trashTasks = list;
      this.trash = this.trashTasks.traverse();
    });
  }

}
