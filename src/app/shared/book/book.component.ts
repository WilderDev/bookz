import { Component, Input, OnInit } from '@angular/core';
import { Book } from './book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() bookIndex: number;
  @Input() book: Book;

  constructor() {}

  ngOnInit(): void {}
}
