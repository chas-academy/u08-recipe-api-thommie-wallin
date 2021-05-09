import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealtypeSelectComponent } from './mealtype-select.component';

describe('MealtypeSelectComponent', () => {
  let component: MealtypeSelectComponent;
  let fixture: ComponentFixture<MealtypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealtypeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealtypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
