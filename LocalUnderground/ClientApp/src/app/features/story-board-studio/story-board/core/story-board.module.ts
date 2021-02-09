import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../../app-config/app-base.module';
import { StoryBoardComponent } from './story-board.component';
import { StoryBoardService } from './story-board.services';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WidgetModule } from '../widget/core/widget.module';


@NgModule({
  declarations: [
    StoryBoardComponent,
  ],
  imports: [
    AppBaseModule,
    DragDropModule,
    WidgetModule
  ],
  exports: [
    StoryBoardComponent,
  ],
  providers: [
    StoryBoardService
  ]
})
export class StoryBoardModule { }
