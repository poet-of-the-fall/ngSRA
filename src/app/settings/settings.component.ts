import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DEFAULT_SETTINGS, Lane, Settings } from '../data.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith } from 'rxjs';
import { ColorPickerModule } from 'ngx-color-picker';
import { ShootingRangeComponent } from '../shooting-range/shooting-range.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    ColorPickerModule,
    ShootingRangeComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  readonly dialogRef = inject(MatDialogRef<SettingsComponent>);
  data: Settings = inject(MAT_DIALOG_DATA);
  settingsForm: FormGroup = inject(FormBuilder).group({
    serverUrl: [
      this.data.serverUrl,
      Validators.pattern(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
    ],
    intervall: [this.data.intervall, [Validators.min(0)]],
    autoLayout: [this.data.autoLayout],
    rows: [this.data.rows, [Validators.min(1), Validators.max(100)]],
    cols: [this.data.cols, [Validators.min(1), Validators.max(100)]],
    gap: [this.data.gap, [Validators.min(0), Validators.max(1000)]],
    showName: [this.data.showName],
    cornerRadius: [
      this.data.cornerRadius,
      [Validators.min(0), Validators.max(1000)],
    ],
    cornerRadiusType: [this.data.cornerRadiusType],
    colorFree: [this.data.colorFree, [Validators.minLength(3)]],
    colorOccupied: [this.data.colorOccupied, [Validators.minLength(3)]],
    colorText: [this.data.colorText, [Validators.minLength(3)]],
    fontSizeNumber: [
      this.data.fontSizeNumber,
      [Validators.min(10), Validators.max(1000)],
    ],
    fontSizeName: [
      this.data.fontSizeName,
      [Validators.min(5), Validators.max(1000)],
    ],
  });
  rangePreviews: Array<Lane> = [
    {
      LaneNo: 1,
      Free: true,
      Shooter: 'John Doe',
    },
    {
      LaneNo: 2,
      Free: false,
      Shooter: 'Jane Doe',
    },
    {
      LaneNo: 3,
      Free: false,
      Shooter: 'John Doe',
    },
    {
      LaneNo: 4,
      Free: true,
      Shooter: 'Jane Doe',
    },
  ];

  constructor() {
    this.dialogRef.updateSize('80vw', '80vh');

    this.settingsForm.valueChanges
      .pipe(startWith(this.settingsForm.value))
      .subscribe((value) => {
        if (value.autoLayout) {
          this.settingsForm.get('rows')?.disable({ emitEvent: false });
          this.settingsForm.get('cols')?.disable({ emitEvent: false });
        } else {
          this.settingsForm.get('rows')?.enable({ emitEvent: false });
          this.settingsForm.get('cols')?.enable({ emitEvent: false });
        }
      });
  }

  applySettings() {
    this.dialogRef.close(this.settingsForm.value);
  }

  resetDefaults() {
    this.settingsForm.setValue(DEFAULT_SETTINGS);
  }
}
