import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RecipeDisplayComponent } from './components/recipes/recipe-display/recipe-display.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserRecipeListsComponent } from './components/user-recipe-lists/user-recipe-lists.component';
import { ReadOneListComponent } from './components/user-recipe-lists/read-one-list/read-one-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeDisplayComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-lists', component: UserRecipeListsComponent },
  { path: 'my-lists/:id', component: ReadOneListComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
