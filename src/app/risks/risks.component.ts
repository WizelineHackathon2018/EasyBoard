import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.css']
})
export class RisksComponent implements OnInit {

  numYellow: number;
  numOrange: number;
  numRed: number;

  constructor() { }

  ngOnInit() {
    this.numYellow = 5;
    this.numOrange = 10;
    this.numRed = 2;

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
