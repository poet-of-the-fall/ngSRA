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
  starterlistId: number = 1;

  constructor() {
    const slId = localStorage.getItem("starterlistId");
    if (slId) {
      this.starterlistId = parseInt(slId);
    }
  }

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
    if (data.RVErrorMsg) {
      this.incrementStarterlistId();
      return;
    }
    switch (data.Rsp) {
      case 'GetLaneInfo':
        if (data.Data) {
          this.laneInfo.next(data);
        }
        break;
    }
  }

  private incrementStarterlistId() {
    this.starterlistId = this.starterlistId + 1;
    localStorage.setItem("starterlistId", this.starterlistId.toString());
    this.refreshLaneData();
  }

  refreshLaneData() {
    const message = {
      Prot: 'MEWS',
      VerP: 2,
      SubProt: 'LA',
      VerSP: 2,
      SeqNo: 9,
      Cmd: 'GetLaneInfo',
      Data: { StartlistID: this.starterlistId },
    };
    this.websocket?.next(message);
  }
}

{"Prot":"MEWS","RV":-3,"RVErrorMsg":"Fehler beim Laden von Daten aus der Datenbank!","Rsp":"GetLaneInfo","SeqNo":5778,"SeqNoRsp":9,"SubProt":"LA","VerP":2,"VerSP":2}

{"Prot":"MEWS","RV":0,"Rsp":"GetLaneInfo","SeqNo":5859,"SeqNoRsp":11,"SubProt":"LA","VerP":2,"VerSP":2}
