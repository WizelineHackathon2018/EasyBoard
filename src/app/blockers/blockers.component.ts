import {Component, Input, OnInit} from '@angular/core';
import {Blocker} from './blocker.model';

@Component({
  selector: 'app-blockers',
  templateUrl: './blockers.component.html',
  styleUrls: ['./blockers.component.css']
})
export class BlockersComponent implements OnInit {

  @Input() blockers: Blocker[] = [];

  constructor() { }

  ngOnInit() {
  }

}
