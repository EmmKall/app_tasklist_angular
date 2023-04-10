import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { UsersComponent } from './body/users/users.component';
import { CategoryComponent } from './body/category/category.component';
import { TaskComponent } from './body/task/task.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { InformationService } from './services/information.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    BodyComponent,
    UsersComponent,
    CategoryComponent,
    TaskComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    InformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
