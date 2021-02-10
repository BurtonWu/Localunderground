import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { StoryBoardStudioComponent } from './story-board-studio.component';
import { StoryBoardCardInfoComponent } from '../story-board-card/story-board-card-info.component';
import { StoryBoardEditModule } from '../story-board-edit/core/story-board-edit.module';


@NgModule({
  declarations: [
    StoryBoardStudioComponent,
    StoryBoardCardInfoComponent
  ],
  imports: [
    AppBaseModule,
    StoryBoardEditModule
  ],
  exports: [
    StoryBoardStudioComponent,
    StoryBoardCardInfoComponent
  ],
  providers: [
  ]
})
export class StoryBoardStudioModule { }
