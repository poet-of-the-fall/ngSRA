import { Component, inject } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Lane, LaneInfo, Placeholder } from './data.model';
import { ShootingRangeComponent } from './shooting-range/shooting-range.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShootingRangeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  websocketService: WebsocketService = inject(WebsocketService);
  data: Array<Lane> = [];
  rows: number = 1;
  columns: number = 1;

  constructor() {
    this.connect();
    this.websocketService.laneInfo.subscribe((data) => {
      this.data = data.Data;
      this.rows = Math.floor(Math.sqrt(data.Data.length));
      this.columns = Math.ceil(data.Data.length / this.rows);
    });
  }

  connect() {
    this.websocketService.connectSocket();
    setInterval(() => this.websocketService.refreshLaneData(), 10000);
  }

  fullscreen() {
    document.documentElement.requestFullscreen();
  }
  // Appearance:
  // - Light dark
  // - row/col auto / fixed
  // corner radius
  // gap
  // show name
  // fullscreen toggle
  // ip
}
