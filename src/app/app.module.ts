import { UserListModule } from './user-list/user-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../common/const/routes.const';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
   declarations: [
      AppComponent,
      BaseComponent,
      HeaderComponent,
      FooterComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(ROUTES),
      UserListModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
