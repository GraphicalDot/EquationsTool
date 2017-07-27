import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubconceptComponent } from './subconcept.component';

describe('SubconceptComponent', () => {
  let component: SubconceptComponent;
  let fixture: ComponentFixture<SubconceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubconceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubconceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
