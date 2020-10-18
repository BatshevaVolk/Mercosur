import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmaillSnackBarComponent } from './add-emaill-snack-bar.component';

describe('AddEmaillSnackBarComponent', () => {
  let component: AddEmaillSnackBarComponent;
  let fixture: ComponentFixture<AddEmaillSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmaillSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmaillSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
