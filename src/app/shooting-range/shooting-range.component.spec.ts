import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeComponent } from './shooting-range.component';

describe('ShootingRangeComponent', () => {
  let component: ShootingRangeComponent;
  let fixture: ComponentFixture<ShootingRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShootingRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
