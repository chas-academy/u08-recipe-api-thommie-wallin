import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { List } from '../../../../shared/interfaces';
import { UserRecipeListsService } from '../../../../core/services/user-recipe-lists.service';

@Component({
  selector: 'app-read-all-lists',
  templateUrl: './read-all-lists.component.html',
  styleUrls: ['./read-all-lists.component.css']
})
export class ReadAllListsComponent implements OnInit {
  // Lists to present in component
  @Input() list: List[];

  // List to remove
  @Output() deleteEvent = new EventEmitter<any>();

  // Search function variables
  lists: Observable<List[]>;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  searchTitle: string[];
  searchObject;

  constructor(
    public router: Router,
    public userRecipeListsService: UserRecipeListsService,
    ) { }

  ngOnInit(): void {
    // Latest list of lists
    this.lists = this.userRecipeListsService.lists;

    // Array of list titles and list objects from database
    this.lists.subscribe(data => {
      this.searchTitle = data.map(title => title.title);
      this.searchObject = data.map(title => title);
    }).unsubscribe;

    // Filter list when typing in a search item
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // Delete list
  deleteId(event) {
    this.deleteEvent.emit(event);
  }

  // Search filter method
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchTitle.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Routeer for search item 
  showSelected($event) {  
    const list = this.searchObject.find( ({ title }) => title === $event );
    this.router.navigate(['my-lists/', list.id]);
  }
}
