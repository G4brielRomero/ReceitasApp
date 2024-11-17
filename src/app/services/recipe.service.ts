import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = new BehaviorSubject<Recipe[]>([]);
  public recipes$ = this.recipes.asObservable();

  addRecipe(recipe: Recipe) {
    const currentRecipes = this.recipes.value;
    this.recipes.next([...currentRecipes, recipe]);
  }

  editRecipe(id: string, updatedRecipe: Partial<Recipe>) {
    const currentRecipes = this.recipes.value.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    this.recipes.next(currentRecipes);
  }

  deleteRecipe(id: string) {
    const currentRecipes = this.recipes.value.filter(recipe => recipe.id !== id);
    this.recipes.next(currentRecipes);
  }

  constructor() {
    // Exemplo de receitas
    this.recipes.next([
      {
        id: '1',
        title: 'Bolo de Chocolate',
        description: 'Bolo de chocolate delicioso!',
        date: new Date(),
        category: 'Sobremesas',
        ratings: [4, 5],
        comments: [],
      },
      {
        id: '2',
        title: 'Pão de Queijo',
        description: 'Pão de queijo mineiro!',
        date: new Date(),
        category: 'Lanches',
        ratings: [5, 5],
        comments: [],
      },
    ]);
  }

}
