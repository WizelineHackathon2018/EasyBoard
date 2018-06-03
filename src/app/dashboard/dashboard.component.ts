import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blockers: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/blockers/get').subscribe( data => {
      this.blockers = data;
    });
  }

}
