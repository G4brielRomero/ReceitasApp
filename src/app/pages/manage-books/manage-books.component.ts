import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [],
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss'],
})

export class ManageBooksComponent implements OnInit {
  bookForm: FormGroup;
  books: Book[] = [];
  selectedBook: Book | null = null;
  editMode = false;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Carregar os livros de receitas do usuário (de um serviço ou local storage)
  }

  onSubmit() {
    if (this.editMode) {
      this.selectedBook!.name = this.bookForm.value.name;
      this.editMode = false;
      this.selectedBook = null;
    } else {
      const newBook: Book = {
        id: Math.random().toString(36).substring(2),
        name: this.bookForm.value.name,
        recipes: [],
      };
      this.books.push(newBook);
    }
    this.bookForm.reset();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    this.bookForm.patchValue({ name: book.name });
    this.editMode = true;
  }

  deleteBook(id: string) {
    this.books = this.books.filter(book => book.id !== id);
    if (this.selectedBook && this.selectedBook.id === id) {
      this.selectedBook = null;
    }
  }

  removeRecipeFromBook(recipeId: string) {
    if (this.selectedBook) {
      this.selectedBook.recipes = this.selectedBook.recipes.filter(recipe => recipe.id !== recipeId);
    }
  }
}
