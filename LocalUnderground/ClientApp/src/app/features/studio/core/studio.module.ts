import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { StudioComponent } from './studio.component';
import { StoryBoardCardInfoComponent } from '../story-board-card/story-board-card-info.component';
import { StoryBoardEditModule } from '../story-board-edit/story-board-edit.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    StudioComponent,
    StoryBoardCardInfoComponent
  ],
  imports: [
    AppBaseModule,
    StoryBoardEditModule,
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
