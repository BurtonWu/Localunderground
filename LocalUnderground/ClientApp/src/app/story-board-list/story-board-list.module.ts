import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from '../panel/panel.module';
import { StoryBoardListComponent } from './story-board-list.component';


@NgModule({
  declarations: [
    StoryBoardListComponent,
  ],
  imports: [
    AppBaseModule,
    PanelModule
  ],
  exports: [
    StoryBoardListComponent,
  ],
  providers: [
  ]
})
export class StoryBoardListModule { }
