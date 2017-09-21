import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariabletemplateComponent } from './variabletemplate.component';

describe('VariabletemplateComponent', () => {
  let component: VariabletemplateComponent;
  let fixture: ComponentFixture<VariabletemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariabletemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariabletemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
