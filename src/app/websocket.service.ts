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

  disconnectSocket() {
    this.websocket?.complete();
  }

  connectSocket(url: string) {
    this.websocket = webSocket(`ws://${url}:53088`);

    this.websocket.subscribe({
      next: (data) => this.handleData(data),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  private handleData(data: any) {
    switch (data.Rsp) {
      case 'GetLaneInfo':
        this.laneInfo.next(data);
        break;
    }
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
