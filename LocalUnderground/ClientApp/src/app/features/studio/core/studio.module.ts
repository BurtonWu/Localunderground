import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { StudioComponent } from './studio.component';
import { StoryBoardCardInfoComponent } from '../story-board-card/story-board-card-info.component';
import { StoryBoardModule } from '../story-board/story-board.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    StudioComponent,
    StoryBoardCardInfoComponent
  ],
  imports: [
    AppBaseModule,
    StoryBoardModule,
    LayoutModule
  ],
  exports: [
    StudioComponent,
    StoryBoardCardInfoComponent
  ],
  providers: [
  ]
})
export class StudioModule { }
