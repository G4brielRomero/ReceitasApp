import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
  ],
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService.recipes$.subscribe(recipes => {
        this.recipe = recipes.find(r => r.id === recipeId) || null;
        if (this.recipe) {
          this.recipeForm.patchValue({
            title: this.recipe.title,
            category: this.recipe.category,
            description: this.recipe.description
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid && this.recipe) {
      const updatedRecipe: Recipe = {
        ...this.recipe,
        ...this.recipeForm.value
      };
      this.recipeService.editRecipe(this.recipe.id, updatedRecipe);  // Update the recipe in the service
      this.router.navigate(['/recipe-list']);  // Navigate back to the recipe list
    }
  }
}
