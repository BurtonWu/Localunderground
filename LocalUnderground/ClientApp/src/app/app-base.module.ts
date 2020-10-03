import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLoginModule } from './auth/auth-login.module';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.services';

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
    SharedModule
    
  ],
  providers: [
    SharedService
  ],
})
export class AppBaseModule { }
