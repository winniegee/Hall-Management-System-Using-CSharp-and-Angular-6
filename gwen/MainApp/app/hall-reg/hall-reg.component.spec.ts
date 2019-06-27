import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallRegComponent } from './hall-reg.component';

describe('HallRegComponent', () => {
  let component: HallRegComponent;
  let fixture: ComponentFixture<HallRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
