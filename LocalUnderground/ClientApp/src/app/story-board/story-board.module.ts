import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from '../panel/panel.module';
import { StoryBoardComponent } from './story-board.component';
import { StoryBoardService } from './story-board.services';
import { StoryBoardListComponent } from '../story-board-list/story-board-list.component';
import { StoryBoardListModule } from '../story-board-list/story-board-list.module';
import { TextWidgetModule } from '../text-widget/text-widget.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    StoryBoardComponent,
  ],
  imports: [
    AppBaseModule,
    DragDropModule,
    TextWidgetModule
  ],
  exports: [
    StoryBoardComponent,
  ],
  providers: [
    StoryBoardService
  ]
})
export class StoryBoardModule { }
