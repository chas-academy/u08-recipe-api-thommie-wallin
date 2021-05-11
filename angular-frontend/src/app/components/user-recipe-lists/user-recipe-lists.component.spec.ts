import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeListsComponent } from './user-recipe-lists.component';

describe('UserRecipeListsComponent', () => {
  let component: UserRecipeListsComponent;
  let fixture: ComponentFixture<UserRecipeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecipeListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecipeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
