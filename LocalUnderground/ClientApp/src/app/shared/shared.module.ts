import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedService } from './shared.services';
import { CommonModule } from '@angular/common';
import { StringTruncatePipe } from './pipes/string-truncate.pipe';


@NgModule({
  declarations: [
    StringTruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StringTruncatePipe
  ],
  providers: [
    
  ]
})
export class SharedModule { }
