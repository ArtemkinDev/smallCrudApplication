import { LocalstorageService } from './../common/services/localstorage.service';
import { UserListModule } from './user-list/user-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../common/const/routes.const';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserService } from '../common/services/user.service';
import { NotFoundComponent } from './not-found-page/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    UserListModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [ UserService, LocalstorageService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
