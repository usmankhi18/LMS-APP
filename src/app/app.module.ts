import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { BookCategoriesComponent } from './book-categories/book-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    LoginComponent,
    LibraryComponent,
    ProfileComponent,
    ManageBooksComponent,
    ManageCategoriesComponent,
    BookCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7038'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
