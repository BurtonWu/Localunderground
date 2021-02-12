import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoryBoardViewComponent } from './story-board-view.component';
import { WidgetModule } from '../../widget/core/widget.module';
import { StoryBoardViewService } from './story-board-view.services';


@NgModule({
  declarations: [
    StoryBoardViewComponent,
  ],
  imports: [
    AppBaseModule,
    DragDropModule,
    WidgetModule
  ],
  exports: [
    StoryBoardViewComponent,
  ],
  providers: [
    StoryBoardViewService
  ]
})
export class StoryBoardViewModule { }
