import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { environment } from 'src/environments/environment';
import { Recipe } from '../../shared/models/recipe.model';

@Injectable({
  providedIn: CoreModule,
})
export class DataService {

  private apiKey: string = `${environment.spoonacularApiKey}`;
  baseUrl: string = `https://api.spoonacular.com/recipes/`;

  constructor(private http: HttpClient) { }

  getRecipesBySelected(mealType: string, allergene: string, diet: string) : Observable<any> {
    // If mealtype not empty string
    let url: string = '';

    if (allergene) {
      url += `intolerances=${allergene}&`
    }
    if (mealType) {
      url += `type=${mealType}&`
    }
    if (diet) {
      url += `diet=${diet}&`
    }
    return this.http.get<any>(`${this.baseUrl}complexSearch?${url}number=20&instructionsRequired=true`, {
      params: new HttpParams()
      .append('apiKey', this.apiKey)
    })
  }

  getRecipe(id: number) : Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}${id}/information`, {
      params: new HttpParams()
      .append('apiKey', this.apiKey)
    })
  }
}
