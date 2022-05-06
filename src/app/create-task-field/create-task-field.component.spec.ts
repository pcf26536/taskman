import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskFieldComponent } from './create-task-field.component';

describe('CreateTaskFieldComponent', () => {
  let component: CreateTaskFieldComponent;
  let fixture: ComponentFixture<CreateTaskFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
