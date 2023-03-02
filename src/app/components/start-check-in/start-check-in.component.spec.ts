import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCheckInComponent } from './start-check-in.component';

describe('StartCheckInComponent', () => {
  let component: StartCheckInComponent;
  let fixture: ComponentFixture<StartCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCheckInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
