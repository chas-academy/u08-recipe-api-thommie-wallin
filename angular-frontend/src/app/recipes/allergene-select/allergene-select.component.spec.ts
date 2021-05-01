import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergeneSelectComponent } from './allergene-select.component';

describe('AllergeneSelectComponent', () => {
  let component: AllergeneSelectComponent;
  let fixture: ComponentFixture<AllergeneSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergeneSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergeneSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
