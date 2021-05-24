import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToListComponent } from './save-to-list.component';

describe('SaveToListComponent', () => {
  let component: SaveToListComponent;
  let fixture: ComponentFixture<SaveToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
