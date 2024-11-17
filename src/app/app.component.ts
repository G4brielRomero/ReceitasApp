import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RecipeDetailsComponent } from "./pages/recipe-details/recipe-details.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { ViewRecipesComponent } from "./pages/view-recipes/view-recipes.component";
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { HeaderComponent } from "./layout/header/header.component";
import { NavComponent } from "./layout/nav/nav.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    RecipeDetailsComponent,
    SignupComponent,
    ViewRecipesComponent,
    ManageBooksComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    RecipeListComponent,
    MatFormFieldModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'receitaApp';
}
