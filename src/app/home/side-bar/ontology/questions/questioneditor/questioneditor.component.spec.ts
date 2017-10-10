import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioneditorComponent } from './questioneditor.component';

describe('QuestioneditorComponent', () => {
  let component: QuestioneditorComponent;
  let fixture: ComponentFixture<QuestioneditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioneditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioneditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
