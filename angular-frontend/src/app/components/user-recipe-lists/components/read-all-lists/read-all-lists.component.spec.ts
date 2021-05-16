import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllListsComponent } from './read-all-lists.component';

describe('ReadAllListsComponent', () => {
  let component: ReadAllListsComponent;
  let fixture: ComponentFixture<ReadAllListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
