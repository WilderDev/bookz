import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BookDetailsComponent } from './bookshelf/book-details/book-details.component';
import { BookResolverService } from './bookshelf/book-resolver.service';
import { BookshelfEditorComponent } from './bookshelf/bookshelf-editor/bookshelf-editor.component';
import { BookshelfHomeComponent } from './bookshelf/bookshelf-home/bookshelf-home.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { LibraryComponent } from './library/library.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/bookshelf", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "bookshelf",
    loadChildren: () =>
      import("./bookshelf/bookshelf.module").then(m => m.BookshelfModule)
  },
  {
    path: "library",
    loadChildren: () =>
      import("./library/library.module").then(m => m.LibraryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
