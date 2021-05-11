import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UserRecipeListsComponent } from './user-recipe-lists.component';
import { CreateListComponent } from './components/create-list/create-list.component';



@NgModule({
  declarations: [
    UserRecipeListsComponent,
    CreateListComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule,
  ]
})
export class UserRecipeListsModule { }
