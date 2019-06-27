import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailsComponent } from './hall-details.component';

describe('HallDetailsComponent', () => {
  let component: HallDetailsComponent;
  let fixture: ComponentFixture<HallDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
