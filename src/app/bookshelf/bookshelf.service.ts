import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../shared/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  bookshelfBooksChanged = new Subject<Book[]>();
  newBookAdded = new Subject<Book>();

  constructor() {}

  private globalBookshelfBooks: Book[] = [];

  // CREATE (one)
  addBookToBookshelf(book: Book) {
    this.globalBookshelfBooks.push(book);
    this.bookshelfBooksChanged.next(this.globalBookshelfBooks.slice());
  }

  // READ (many)
  getBookshelfBooks() {
    return this.globalBookshelfBooks.slice();
  }

  // READ (one)
  getBookshelfBook(idx: number) {
    return this.globalBookshelfBooks.slice()[idx];
  }

  // UPDATE (one)
  updateBookshelfBook(index: number, updatedBookDetails: Book) {
    this.globalBookshelfBooks[index] = updatedBookDetails;
    this.bookshelfBooksChanged.next(this.globalBookshelfBooks.slice());
  }

  // UPDATE (many)
  setBooks(books: Book[]) {
    this.globalBookshelfBooks = books || [];
    this.bookshelfBooksChanged.next(this.globalBookshelfBooks.slice());
  }

  // DELETE (one)
  removeBookFromBookshelf(idx: number) {
    if (idx === -1) return;

    this.globalBookshelfBooks.splice(idx, 1);
    this.bookshelfBooksChanged.next(this.globalBookshelfBooks.slice());
  }
}
