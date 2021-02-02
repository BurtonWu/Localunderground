import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetComponent } from './text-widget.component';
import { TextWidgetService } from './text-widget.services';


@NgModule({
  declarations: [
    TextWidgetModalComponent,
    TextWidgetComponent
  ],
  imports: [
    AppBaseModule
  ],
  exports: [
    TextWidgetModalComponent,
    TextWidgetComponent
  ],
  providers: [
    TextWidgetService
  ]
})
export class TextWidgetModule { }
