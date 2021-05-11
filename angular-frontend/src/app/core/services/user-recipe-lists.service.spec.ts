import { TestBed } from '@angular/core/testing';

import { UserRecipeListsService } from './user-recipe-lists.service';

describe('UserRecipeListsService', () => {
  let service: UserRecipeListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRecipeListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
