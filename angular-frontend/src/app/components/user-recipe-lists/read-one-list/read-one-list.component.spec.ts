import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneListComponent } from './read-one-list.component';

describe('ReadOneListComponent', () => {
  let component: ReadOneListComponent;
  let fixture: ComponentFixture<ReadOneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
