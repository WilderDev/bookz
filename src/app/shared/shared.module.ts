import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookComponent } from './book/book.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [BookComponent, NotificationComponent, DropdownDirective], // Components, Pipes, Directives
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], // Modules
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NotificationComponent,
    BookComponent,
    DropdownDirective
  ] // Anything other Features will need access to
})
export class SharedModule {}
