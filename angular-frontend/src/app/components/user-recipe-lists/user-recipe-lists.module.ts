import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { UserRecipeListsComponent } from './user-recipe-lists.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ReadAllListsComponent } from './components/read-all-lists/read-all-lists.component';
import { ReadOneListComponent } from './read-one-list/read-one-list.component';



@NgModule({
  declarations: [
    UserRecipeListsComponent,
    CreateListComponent,
    ReadAllListsComponent,
    ReadOneListComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    FlexLayoutModule,
    MatDividerModule,
    MatAutocompleteModule,
  ]
})
export class UserRecipeListsModule { }
