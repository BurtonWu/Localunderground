import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { WidgetService } from './widget.service';
import { TextWidgetModule } from '../text-widget/text-widget.module';
import { ImageWidgetModule } from '../image-widget/image-widget.module';
import { WidgetComponent } from './widget.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppBaseModule } from 'src/app/app-config/app-base.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    AppBaseModule,
    TextWidgetModule,
    ImageWidgetModule,
    DragDropModule
  ],
  exports: [
    TextWidgetModule,
    ImageWidgetModule,
    WidgetComponent
  ],
  providers: [
    WidgetService
  ]
})
export class WidgetModule { }
