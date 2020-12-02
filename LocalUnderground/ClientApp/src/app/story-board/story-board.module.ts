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


@NgModule({
  declarations: [
    StoryBoardComponent,
  ],
  imports: [
    AppBaseModule,
    PanelModule
  ],
  exports: [
    StoryBoardComponent,
  ],
  providers: [
    StoryBoardService
  ]
})
export class StoryBoardModule { }
