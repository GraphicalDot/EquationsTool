import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NanoskillComponent } from './nanoskill.component';

describe('NanoskillComponent', () => {
  let component: NanoskillComponent;
  let fixture: ComponentFixture<NanoskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NanoskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NanoskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
