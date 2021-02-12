import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ImageWidgetEditComponent } from './image-widget-edit.component';
import { ImageWidgetService } from './image-widget.services';
import { ImageDndComponent } from './image-dnd.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { ImageWidgetViewComponent } from './image-widget-view.component';


@NgModule({
  declarations: [
    ImageWidgetViewComponent,
    ImageWidgetEditComponent,
    ImageDndComponent
  ],
  imports: [
    AppBaseModule,
    DragDropModule
  ],
  exports: [
    ImageWidgetViewComponent,
    ImageWidgetEditComponent,
    ImageDndComponent
  ],
  providers: [
    ImageWidgetService
  ]
})
export class ImageWidgetModule { }
