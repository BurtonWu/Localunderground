import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from '../panel/panel.module';
import { LayoutComponent } from './layout.component';
import { StoryBoardModule } from '../story-board/story-board.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    AppBaseModule,
    PanelModule,
    StoryBoardModule
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [
  ]
})
export class LayoutModule { }
