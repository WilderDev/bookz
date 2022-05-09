import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BookResultsComponent } from './book-results/book-results.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { LibraryComponent } from './library.component';

@NgModule({
  declarations: [LibraryComponent, BookResultsComponent, BookSearchComponent], // Components / Directives / Pipes exclusive to this feature/page
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: "", component: LibraryComponent }])
  ] // External Modules for Functionality
})
export class LibraryModule {}
