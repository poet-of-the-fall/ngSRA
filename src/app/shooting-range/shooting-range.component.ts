import { Component, InputSignal, input } from '@angular/core';
import { Lane, Placeholder, Settings } from '../data.model';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-shooting-range',
    imports: [MatCardModule, NgClass],
    templateUrl: './shooting-range.component.html',
    styleUrl: './shooting-range.component.scss'
})
export class ShootingRangeComponent {
  shootingRange: InputSignal<Lane> = input.required<Lane>();
  settings: InputSignal<Settings> = input.required<Settings>();
}
