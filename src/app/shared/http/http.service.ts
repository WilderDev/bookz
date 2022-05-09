import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookshelfService } from '../../bookshelf/bookshelf.service';
import { Book } from '../book/book.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  firebaseRootURL =
    'https://book-app---1-default-rtdb.firebaseio.com/books.json';

  constructor(
    private http: HttpClient,
    private bookshelfService: BookshelfService
  ) {}

  saveBooksToFirebase() {
    const books = this.bookshelfService.getBookshelfBooks();

    this.http.put(this.firebaseRootURL, books).subscribe((res) => {
      console.log('Firebase DB Response:', res);
    });
  }

  fetchBooksFromFirebase() {
    return this.http.get(this.firebaseRootURL, {}).pipe(
      tap((books: Book[]) => {
        this.bookshelfService.setBooks(books);
      })
    );
  }
}
