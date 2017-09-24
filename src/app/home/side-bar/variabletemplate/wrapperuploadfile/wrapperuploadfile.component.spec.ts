import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperuploadfileComponent } from './wrapperuploadfile.component';

describe('WrapperuploadfileComponent', () => {
  let component: WrapperuploadfileComponent;
  let fixture: ComponentFixture<WrapperuploadfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperuploadfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperuploadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
