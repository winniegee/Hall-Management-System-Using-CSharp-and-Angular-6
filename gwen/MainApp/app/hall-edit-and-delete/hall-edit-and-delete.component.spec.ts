import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallEditAndDeleteComponent } from './hall-edit-and-delete.component';

describe('HallEditAndDeleteComponent', () => {
  let component: HallEditAndDeleteComponent;
  let fixture: ComponentFixture<HallEditAndDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallEditAndDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallEditAndDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
