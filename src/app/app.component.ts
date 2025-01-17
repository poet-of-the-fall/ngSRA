import { Component, inject } from '@angular/core';
import { WebsocketService } from './websocket.service';
import {
  DEFAULT_SETTINGS,
  Lane,
  LaneInfo,
  Settings,
  STORAGE_KEY,
} from './data.model';
import { ShootingRangeComponent } from './shooting-range/shooting-range.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShootingRangeComponent, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly dialog = inject(MatDialog);
  websocketService: WebsocketService = inject(WebsocketService);
  settings: Settings = DEFAULT_SETTINGS;
  data: Array<Lane> = [];
  rows: number = 1;
  columns: number = 1;
  showSettingsButton: boolean = false;
  moveTimout: NodeJS.Timeout | undefined;
  refreshIntervall: NodeJS.Timeout | undefined;

  constructor() {
    const storedSettings = localStorage.getItem(STORAGE_KEY);
    if (storedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
    }

    this.connect();
    this.websocketService.laneInfo.subscribe((data) => {
      this.processData(data);
    });

    //TODO remove
    // setInterval(() => {
    //   this.processData({
    //     Data: [
    //       {
    //         LaneNo: 1,
    //         Free: false,
    //         Shooter: 'Max Mustermann',
    //       },
    //       {
    //         LaneNo: 2,
    //         Free: true,
    //         Shooter: '',
    //       },
    //       {
    //         LaneNo: 3,
    //         Free: false,
    //         Shooter: 'Daniel Long Name',
    //       },
    //       {
    //         LaneNo: 4,
    //         Free: false,
    //         Shooter: 'Another Long Name Shooter',
    //       },
    //       {
    //         LaneNo: 5,
    //         Free: true,
    //         Shooter: '',
    //       },
    //     ],
    //   });
    // }, 1000);
  }

  processData(data: LaneInfo) {
    if (data.Data == undefined) {
      this.data.map((l) => (l.Free = false));
    } else {
      this.data = data.Data;
    }
    if (this.settings.autoLayout) {
      this.rows = Math.floor(Math.sqrt(this.data.length));
      this.columns = Math.ceil(this.data.length / this.rows);
    } else {
      this.rows = this.settings.rows;
      this.columns = this.settings.cols;
      const elements = this.rows * this.columns;
      const overflow = elements - this.data.length;
      if (overflow < 0) {
        this.data.splice(overflow, Math.abs(overflow));
      }
    }
  }

  connect() {
    clearInterval(this.refreshIntervall);
    this.websocketService.disconnectSocket();

    this.websocketService.connectSocket(this.settings.serverUrl);
    this.refreshIntervall = setInterval(
      () => this.websocketService.refreshLaneData(),
      this.settings.intervall * 1000
    );
  }

  fullscreen() {
    document.documentElement.requestFullscreen();
  }

  mousemove() {
    this.showSettingsButton = true;
    clearTimeout(this.moveTimout);
    this.moveTimout = setTimeout(() => {
      this.showSettingsButton = false;
    }, 1000);
  }

  showSettings(event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(SettingsComponent, {
      data: { ...this.settings },
    });

    dialogRef.afterClosed().subscribe((result: Settings) => {
      if (result) {
        this.settings = result;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
        this.connect();
      }
    });
  }
}
