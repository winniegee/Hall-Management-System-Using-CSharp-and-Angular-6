import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizRegisterComponent } from './biz-register.component';

describe('BizRegisterComponent', () => {
  let component: BizRegisterComponent;
  let fixture: ComponentFixture<BizRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
