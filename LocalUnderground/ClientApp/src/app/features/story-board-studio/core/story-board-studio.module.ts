import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { StoryBoardStudioComponent } from './story-board-studio.component';
import { StoryBoardCardInfoComponent } from '../story-board-card/story-board-card-info.component';
import { StoryBoardEditModule } from '../story-board-edit/story-board-edit.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    StoryBoardStudioComponent,
    StoryBoardCardInfoComponent
  ],
  imports: [
    AppBaseModule,
    StoryBoardEditModule,
    LayoutModule
  ],
  exports: [
    StoryBoardStudioComponent,
    StoryBoardCardInfoComponent
  ],
  providers: [
  ]
})
export class StoryBoardStudioModule { }
