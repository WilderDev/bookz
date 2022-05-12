import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { BookshelfService } from '../../bookshelf/bookshelf.service';
import { Book } from '../../shared/book/book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: "app-book-results",
  templateUrl: "./book-results.component.html",
  styleUrls: ["./book-results.component.css"],
  animations: [
    trigger("swoopIn", [
      transition(":enter", [
        animate(
          "1s",
          keyframes([
            style({
              transform: "scale(0)",
              opacity: 0
            }),
            style({
              transform: "scale(1)",
              opacity: 1
            })
          ])
        )
      ])
    ])
  ]
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
