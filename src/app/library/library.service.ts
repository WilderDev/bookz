import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Book } from '../shared/book/book.model';

@Injectable({
  providedIn: "root"
})
export class LibraryService {
  libraryListChanged = new EventEmitter();

  constructor(private http: HttpClient) {}

  private allLibraryBooks: Book[] = [];

  // Read
  getLibraryBooks() {
    return this.allLibraryBooks.slice();
  }

  fetchBooksFromAPI(query: string) {
    // Turn Search Query into lowercase words with plus sign for spaces
    const formattedQuery = query
      .split(" ")
      .join("+")
      .toLowerCase();

    // Send HTTP GET Request to the "openLibrary" api endpoint using the tranformed input query
    this.http
      .get(`https://openlibrary.org/search.json?q=${formattedQuery}`)
      .subscribe((searchResults: any) => {
        this.saveBooksToGlobalArray(searchResults.docs.slice(0, 10));
      });
  }

  saveBooksToGlobalArray(books) {
    books.forEach(book => {
      const simpleBook = new Book(
        book.title,
        book.author_name ? book.author_name[0] : "unknown",
        "unknown",
        "https://tse2.mm.bing.net/th?id=OIP.I6LGwie40Vw4K8gmV52MKwHaLc&pid=Api&P=0&w=300&h=300"
      );

      this.allLibraryBooks.push(simpleBook);
    });

    this.libraryListChanged.next(this.allLibraryBooks.slice());
  }
}
