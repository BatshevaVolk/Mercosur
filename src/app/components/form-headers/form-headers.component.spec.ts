import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeadersComponent } from './form-headers.component';

describe('FormHeadersComponent', () => {
  let component: FormHeadersComponent;
  let fixture: ComponentFixture<FormHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
