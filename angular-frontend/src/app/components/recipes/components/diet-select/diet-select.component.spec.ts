import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietSelectComponent } from './diet-select.component';

describe('DietSelectComponent', () => {
  let component: DietSelectComponent;
  let fixture: ComponentFixture<DietSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
