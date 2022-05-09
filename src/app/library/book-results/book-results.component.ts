import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book/book.model';
import { LibraryService } from '../library.service';
import { BookshelfService } from '../../bookshelf/bookshelf.service';

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css'],
})
export class BookResultsComponent implements OnInit {
  searchResults: Book[] = [];

  constructor(
    private libraryService: LibraryService,
    private bookshelfService: BookshelfService
  ) {}

  ngOnInit(): void {
    this.searchResults = this.libraryService.getLibraryBooks();

    this.libraryService.libraryListChanged.subscribe((updatedBooks: Book[]) => {
      this.searchResults = updatedBooks;
    });
  }

  onAddToBookshelf(book: Book) {
    this.bookshelfService.addBookToBookshelf(book);
    this.bookshelfService.newBookAdded.next(book);
  }
}
