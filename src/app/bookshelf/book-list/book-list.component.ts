import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../shared/book/book.model';
import { HTTPService } from '../../shared/http/http.service';
import { BookshelfService } from '../bookshelf.service';

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit, OnDestroy {
  private bookListSub: Subscription;
  myBooks: Book[] = [];
  sortField = "author";

  constructor(
    private bookshelfService: BookshelfService,
    private httpService: HTTPService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myBooks = this.bookshelfService.getBookshelfBooks();

    this.bookListSub = this.bookshelfService.bookshelfBooksChanged.subscribe(
      updatedBooks => {
        this.myBooks = updatedBooks;
      }
    );
  }

  ngOnDestroy(): void {
    this.bookListSub.unsubscribe();
  }

  onRemoveBook(idx: number) {
    this.bookshelfService.removeBookFromBookshelf(idx);
  }

  onAddNewBook() {
    // Route to the "/bookshelf/new" page
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onSortBooks() {
    if (this.sortField === "author") {
      // Change to "title"
      this.sortField = "title";
    } else {
      // Change to "author"
      this.sortField = "author";
    }
  }
}
