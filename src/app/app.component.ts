import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Blocker } from './blockers/blocker.model';
import { Message } from './common/message.model';
import { HttpClient } from '@angular/common/http';

declare var cast: any;

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
  blockers: Blocker[] = [];

  constructor(private ref: ChangeDetectorRef, private http: HttpClient) {}
  ngOnInit () {
    this.debug = 'init ';

    try {
      this.context = cast.framework.CastReceiverContext.getInstance();
      const CUSTOM_CHANNEL = 'urn:x-cast:com.easyboard.namespace';
      this.context.addCustomMessageListener(CUSTOM_CHANNEL, (customEvent) => this.handleMessage(customEvent));
      this.context.start();
      this.getBlockersFromGitHub();

    } catch (e) {

    }

    this.debug += this.context;
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
    this.blockers.push(blocker);
  }

  addTestBlocker() {
    // test
  }
}
