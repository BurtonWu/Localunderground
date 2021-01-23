import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { WidgetService } from './widget.service';
import { TextWidgetModule } from '../text-widget/text-widget.module';


@NgModule({
  declarations: [
  ],
  imports: [
    TextWidgetModule
  ],
  exports: [
    TextWidgetModule
  ],
  providers: [
    WidgetService
  ]
})
export class WidgetModule { }
