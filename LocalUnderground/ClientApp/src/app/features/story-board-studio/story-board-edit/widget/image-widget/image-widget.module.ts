import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ImageWidgetComponent } from './image-widget.component';
import { ImageWidgetService } from './image-widget.services';
import { ImageDndComponent } from './image-dnd.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppBaseModule } from '../../../../../app-config/app-base.module';


@NgModule({
  declarations: [
    ImageWidgetComponent,
    ImageDndComponent
  ],
  imports: [
    AppBaseModule,
    DragDropModule
  ],
  exports: [
    ImageWidgetComponent,
    ImageDndComponent
  ],
  providers: [
    ImageWidgetService
  ]
})
export class ImageWidgetModule { }
