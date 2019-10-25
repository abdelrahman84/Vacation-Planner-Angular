import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVacationsComponent } from './current-vacations.component';

describe('CurrentVacationsComponent', () => {
  let component: CurrentVacationsComponent;
  let fixture: ComponentFixture<CurrentVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
