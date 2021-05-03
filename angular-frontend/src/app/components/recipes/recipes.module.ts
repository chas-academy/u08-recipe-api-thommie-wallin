import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipesComponent } from './recipes.component';
import { MealtypeSelectComponent } from './components/mealtype-select/mealtype-select.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { AllergeneSelectComponent } from './components/allergene-select/allergene-select.component';
import { DietSelectComponent } from './components/diet-select/diet-select.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { InstructionsComponent } from './recipe-display/components/instructions/instructions.component';
import { IngredientsComponent } from './recipe-display/components/ingredients/ingredients.component';
import { PresentationComponent } from './recipe-display/components/presentation/presentation.component';




@NgModule({
  declarations: [
    RecipesComponent,
    MealtypeSelectComponent,
    RecipeListComponent,
    AllergeneSelectComponent,
    DietSelectComponent,
    RecipeDisplayComponent,
    InstructionsComponent,
    IngredientsComponent,
    PresentationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FlexLayoutModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatDividerModule,
  ]
})
export class RecipesModule { }
