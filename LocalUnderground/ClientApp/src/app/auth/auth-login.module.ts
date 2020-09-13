import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login.component';
import { AuthorizationService } from './auth-login.services';
import { AuthRegisterComponent } from './auth-register.component';
import { AppBaseModule } from '../app-base.module';
import { AuthorizationGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent
  ],
  imports: [
    FormsModule,
    AppBaseModule
  ],
  exports: [
    AuthLoginComponent,
    AuthRegisterComponent
  ],
  providers: [
    AuthorizationService,
    AuthorizationGuardService
  ]
})
export class AuthLoginModule { }
