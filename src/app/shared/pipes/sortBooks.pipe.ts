import { Book } from './../book/book.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBooks',
})
export class SortBooksPipe implements PipeTransform {
  transform(array: Book[], field: string): number | Book[] {
    array.sort((a: Book, b: Book) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
