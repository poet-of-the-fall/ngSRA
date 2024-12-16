import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { LaneInfo } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private websocket?: WebSocketSubject<any>;
  laneInfo: Subject<LaneInfo> = new Subject<LaneInfo>();

  constructor() {}

  connectSocket() {
    this.websocket = webSocket('ws://192.168.10.200:53088');

    this.websocket.subscribe({
      next: (data) => this.handleData(data), // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    });
  }

  private handleData(data: any) {
    switch (data.Rsp) {
      case 'GetLaneInfo':
        this.laneInfo.next(data);
        break;
    }
    // if (data.SeqNo > 5000) {
    //   this.websocket?.complete();
    //   this.websocket?.unsubscribe();
    //   this.connectSocket();
    // }
  }

  refreshLaneData() {
    const message = {
      Prot: 'MEWS',
      VerP: 2,
      SubProt: 'LA',
      VerSP: 2,
      SeqNo: 9,
      Cmd: 'GetLaneInfo',
      Data: { StartlistID: 126 },
    };
    this.websocket?.next(message);
  }
}
