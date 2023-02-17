import {Component} from '@angular/core';
import {WebSocketService} from './websocketservice';
// import {Client} from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['app.component.ts']
})

export class AppComponent {
  title = "ws-fe"
  message = 'hello';
  notification = '';
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;

    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {
      console.log(`Frame ${frame}`);

      stompClient.subscribe(`/topic/greetings`, data => {
        console.log(data);
        this.notification = data.body;

      })
    });
  }
}
