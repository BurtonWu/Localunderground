import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { PostCardComponent } from './post-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PostCardComponent
  ],
  imports: [
    AppBaseModule
  ],
  exports: [
    PostCardComponent
  ],
  providers: [
  ]
})
export class PostCardModule { }
