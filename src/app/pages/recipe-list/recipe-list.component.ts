import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // Importando os módulos necessários

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterOutlet,
    MatDialogModule
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  displayedColumns: string[] = ['title', 'category', 'date', 'rating', 'actions'];
  searchControl = new FormControl('');
  pageSize = 10;
  pageIndex = 0;
  totalRecipes = 0;
  dialogRef: any;
data: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private dialog: MatDialog  // Injetando MatDialog
  ) {
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
      this.totalRecipes = recipes.length;
    });
  }

  ngOnInit() {
    this.recipes.forEach(recipe => {
      recipe.averageRating = this.calculateAverageRating(recipe.ratings);
    });

    this.searchControl.valueChanges.subscribe(value => {
      console.log('Searching for:', value);
    });
  }

  calculateAverageRating(ratings: number[] | undefined): number {
    ratings = ratings || [];
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  getStarRating(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  onEdit(recipe: Recipe) {
    console.log('Editing recipe:', recipe);
    this.router.navigate(['/recipe-edit', recipe.id]);  // Navegação para editar receita
  }

  onDelete(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '300px',
      data: { recipeTitle: recipe.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleting recipe:', recipe);
        this.recipeService.deleteRecipe(recipe.id);  // Se confirmado, deletar a receita
      }
    });
  }
}

// Componente de diálogo de confirmação
@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <h1 mat-dialog-title>Tem certeza de que deseja excluir "{{data.recipeTitle}}"?</h1>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">Excluir</button>
    </div>
  `,
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { recipeTitle: string }
  ) {}
}
