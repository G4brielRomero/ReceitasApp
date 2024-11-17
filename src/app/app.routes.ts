import { RecipeNewComponent } from './pages/recipe-new/recipe-new.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewRecipesComponent } from './pages/view-recipes/view-recipes.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view-recipes', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'view-recipes', component: ViewRecipesComponent },
  { path: 'recipe-details', component: RecipeDetailsComponent }, //recipe-details/:id
  { path: 'manage-books', component: ManageBooksComponent },
  { path: 'recipe-new', component: RecipeNewComponent},
  { path: 'recipe-edit/:id', component: RecipeEditComponent },
  { path: '', redirectTo: '/recipe-list', pathMatch: 'full' }
];
