import {webSocket} from 'rxjs/webSocket';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['app.component.ts']
})

export class AppComponent {
  title = "ws-fe"
  message = 'hello';
  notifications:Array<any> = new Array<any>();

  constructor() {
    const subject = webSocket("ws://localhost:8090/application")

    subject.subscribe({
      next: msg => {
        this.notifications.push(JSON.stringify(msg) + "\n");
        console.log(msg);
      },
      error: err =>{ console.log("Error "); console.log(err)},
      complete: () => console.log("complete")
    })
  }
}
