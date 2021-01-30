import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from '../panel/panel.module';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { ImageWidgetComponent } from './image-widget.component';
import { ImageWidgetService } from './image-widget.services';


@NgModule({
  declarations: [
    ImageWidgetComponent
  ],
  imports: [
    AppBaseModule
  ],
  exports: [
    ImageWidgetComponent
  ],
  providers: [
    ImageWidgetService
  ]
})
export class ImageWidgetModule { }
