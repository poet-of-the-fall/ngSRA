import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Settings } from '../data.model';

@Component({
    selector: 'app-settings',
    imports: [MatDialogModule, MatButtonModule, MatInputModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  readonly dialogRef = inject(MatDialogRef<SettingsComponent>);
  data: Settings = inject(MAT_DIALOG_DATA);

  applySettings() {
    this.dialogRef.close(this.data);
  }
}
