import {EMPTY, Subject, tap} from 'rxjs';
import {switchAll, catchError} from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['app.component.ts']
})

export class AppComponent {
  public title = "ws-fe"
  public notifications: Array<any> = new Array<any>();

  //region Private fields
  private socket: WebSocketSubject<any>;
  //endregion Private fields

  public constructor() {
      this.socket = webSocket("ws://localhost:8090/application");

    this.socket.subscribe({
      next: msg => {// Called whenever there is a message from the server.
        this.notifications.push(JSON.stringify(msg) + "\n");
        console.log(msg);
      },
      error: err =>{ console.log("Error "); console.log(err)},// Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log("complete")// Called when connection is closed (for whatever reason).
    })
  }

  notify() {
    const id = (document.getElementById("websocketMessageForBe") as HTMLInputElement).value;
    this.socket.next({id: id});
  }

  close() {
    this.socket.complete();
  }

  // notify() {
  //   const message = (document.getElementById("websocketMessageForBe") as HTMLInputElement).value;
  //   this.socket.subscribe();
  //   // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!
  //   this.socket.next({message: message});
  //   // Closes the connection.
  //   this.socket.complete();
  //   // Also closes the connection, but let's the server know that this closing is caused by some error.
  //   this.socket.error({code: 4000, reason: 'Some reason'})
  // }
}
