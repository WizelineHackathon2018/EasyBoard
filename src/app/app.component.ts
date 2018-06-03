import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Blocker } from './blockers/blocker.model';
import { Message } from './common/message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var cast: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('Chano12:ef6765f6e375c5b80b2af713b808956eeccaab7b')
  })
};

const httpOptionsWizeline  = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXUUx6bTNvc1FqRzJoRUdDczBFM0RBIiwicm5kIjoiNGNjMjllNWU3M2FkOGVhZGUzMGMwMTY4MWQ1MjcwYTc3NWE4ZGE3MmNlY2ZkOWU5ZTlhM2JmYjUyYTExYzU1ZTUzN2VmM2U2ZjI2OGM2ZDdiMzVjZGFhY2VmMjFkZDExODRmNjIwNzllNmY2ZmNlNzhjZmYzOTk2Nzg3NzcyMTgiLCJhdWQiOiJjbGllbnQiLCJpYXQiOjE1Mjc5NjIxNTcsIm9pYXQiOjE1Mjc5NjIxNTd9.jqtHBRPsc4lUR8leCOyh82D9_HkPEa9MKfC4InJevao'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Easyboard';
  message = '';
  debug = '';
  context: any;
  manager: any;
  messageBus: any;
  numYellow = 0;
  numOrange = 0;
  numRed = 0;
  blockers: Blocker[] = [];

  constructor(private ref: ChangeDetectorRef, private http: HttpClient) {}
  ngOnInit () {
    this.debug = 'init ';

    try {
      this.getBlockersFromGitHub();
      this.getRisks();

      this.context = cast.framework.CastReceiverContext.getInstance();
      const CUSTOM_CHANNEL = 'urn:x-cast:com.easyboard.namespace';
      this.context.addCustomMessageListener(CUSTOM_CHANNEL, (customEvent) => this.handleMessage(customEvent));
      this.context.start();

    } catch (e) {

    }

    this.debug += this.context;
  }

  getRisks() {
    this.http.get('https://whw2t.wizelineroadmap.com/api/v1/units', httpOptionsWizeline).subscribe(
      response => {
        const risks: any[] = response['values'];

        for (const risk of risks) {
          const level: string = risk.risk_level;

          if (level === 'ON_TRACK') {
            this.numYellow++;
            console.log(risk.name + '=>' + level);
          } else if (level === 'MEDIUM_RISK') {
            console.log(risk.name + '=>' + level);
            this.numOrange++;
          } else if (level === 'HIGH_RISK') {
            console.log(risk.name + '=>' + level);
            this.numRed++;
          }
        }
        this.ref.detectChanges();
      },
      backEndError => {
        this.message = JSON.stringify(backEndError);
      }
    );
  }

  getBlockersFromGitHub() {
    this.http.get<any[]>('https://api.github.com/repos/Chano12/EasyBoard/issues').subscribe(
      results => {
        for (const result of results) {
          const blocker = new Blocker(result['title']);
          this.blockers.push(blocker);
        }
        this.ref.detectChanges();
      }
    );
  }
  handleMessage(customEvent: any) {
    const message: Message = customEvent.data.message;

    this.message = customEvent.data.message['type'];

    const messageType = customEvent.data.message['type'];

    switch (messageType) {
      case 'BLOCKER': {
        this.addBlockerToDB(message.blocker);
        break;
      }
      default: {
        this.addBlockerToDB(new Blocker('default'));
      }
    }

    this.ref.detectChanges();
  }

  private addBlockerToDB(blocker: Blocker) {
    /*this.blockers.push(blocker);

    const gitHubPayload = {
      'title': blocker.name,
      'body': '',
      'assignees': [
        'Chano12'
      ],
      'milestone': 1,
      'state': 'open',
      'labels': [
        'Blockers'
      ]
    };

    this.http.post('https://api.github.com/repos/Chano12/EasyBoard/issues', gitHubPayload, httpOptions).subscribe(
      response => {
        this.message = JSON.stringify(response);
      },
      backEndError => {
        this.message = JSON.stringify(backEndError);
      }
    );*/
  }

  addTestBlocker() {
    this.addBlockerToDB(new Blocker('test'));
  }
}
