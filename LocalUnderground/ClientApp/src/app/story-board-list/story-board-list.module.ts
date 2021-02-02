import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { StoryBoardListComponent } from './story-board-list.component';
import { TextWidgetModule } from '../text-widget/text-widget.module';
import { StoryBoardModule } from '../story-board/story-board.module';


@NgModule({
  declarations: [
    StoryBoardListComponent,
  ],
  imports: [
    AppBaseModule,
    StoryBoardModule
  ],
  exports: [
    StoryBoardListComponent,
  ],
  providers: [
  ]
})
export class StoryBoardListModule { }
