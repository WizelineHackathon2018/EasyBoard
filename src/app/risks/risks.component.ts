import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.css']
})
export class RisksComponent implements OnInit {

  @Input() numYellow: number;
  @Input() numOrange: number;
  @Input() numRed: number;

  constructor() { }

  ngOnInit() {
    this.numYellow = 0;
    this.numOrange = 0;
    this.numRed = 0;

  }

  yellow() {
    console.log('yellow');
  }

  orange() {
    console.log('orange');
  }

  red() {
    console.log('red');
  }

}
