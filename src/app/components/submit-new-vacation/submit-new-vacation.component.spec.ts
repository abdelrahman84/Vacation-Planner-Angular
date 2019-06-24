import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNewVacationComponent } from './submit-new-vacation.component';

describe('SubmitNewVacationComponent', () => {
  let component: SubmitNewVacationComponent;
  let fixture: ComponentFixture<SubmitNewVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitNewVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNewVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
