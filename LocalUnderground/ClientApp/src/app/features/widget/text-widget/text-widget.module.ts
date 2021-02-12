import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetService } from './text-widget.services';
import { TextWidgetViewComponent } from './text-widget-view.component';
import { TextWidgetEditComponent } from './text-widget-edit.component';


@NgModule({
  declarations: [
    TextWidgetModalComponent,
    TextWidgetViewComponent,
    TextWidgetEditComponent
  ],
  imports: [
    AppBaseModule
  ],
  exports: [
    TextWidgetModalComponent,
    TextWidgetViewComponent,
    TextWidgetEditComponent
  ],
  providers: [
    TextWidgetService
  ]
})
export class TextWidgetModule { }
