import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { StoryBoardEditComponent } from './story-board-edit.component';
import { StoryBoardEditService } from './story-board-edit.services';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WidgetModule } from '../../widget/core/widget.module';


@NgModule({
  declarations: [
    StoryBoardEditComponent,
  ],
  imports: [
    AppBaseModule,
    DragDropModule,
    WidgetModule
  ],
  exports: [
    StoryBoardEditComponent,
  ],
  providers: [
    StoryBoardEditService
  ]
})
export class StoryBoardEditModule { }
