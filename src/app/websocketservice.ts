import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable} from '@angular/core';


@Injectable()
export class WebSocketService {

  webSocketEndpoint: string = 'http://localhost:8080/gs-guide-websocket';

  connect() {
    console.log("Initializing WebSocket Connection");
    let ws = new SockJS(this.webSocketEndpoint);
    let stompClient = Stomp.over(ws);

    return stompClient

  }

}
