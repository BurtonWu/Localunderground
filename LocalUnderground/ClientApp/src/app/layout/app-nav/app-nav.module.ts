import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../app-config/app-base.module';
import { SharedModule } from '../../shared/shared.module';
import { AppNavComponent } from './app-nav.component';


@NgModule({
  declarations: [
    AppNavComponent,
  ],
  imports: [
    AppBaseModule
  ],
  exports: [
    AppNavComponent,
  ],
  providers: [
  ]
})
export class AppNavModule { }
