import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.scss'
})
export class ViewRecipesComponent implements OnInit {
  recipes$ = this.recipeService.recipes$;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  rateRecipe(recipeId: string, rating: number) {
    // Lógica para avaliar a receita
    console.log(`Receita ${recipeId} avaliada com nota ${rating}`);
  }
}
