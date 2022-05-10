import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../node.model';

@Component({
  selector: 'app-trash-view',
  templateUrl: './trash-view.component.html',
  styleUrls: ['./trash-view.component.scss']
})
export class TrashViewComponent implements OnInit {

  @Input() trash: Node[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
