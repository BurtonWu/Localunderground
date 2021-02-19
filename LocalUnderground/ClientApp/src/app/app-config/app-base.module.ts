import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthLoginModule } from '../auth/auth-login.module';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,

    BrowserAnimationsModule,
    MatSelectModule,
  ],
  providers: [
    SharedService
  ],
})
export class AppBaseModule { }
