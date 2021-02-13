import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { SharedModule } from '../../../shared/shared.module';
import { StoryBoardCreateComponent } from './story-board-create.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    StoryBoardCreateComponent,
  ],
  imports: [
    AppBaseModule,
    LayoutModule
  ],
  exports: [
    StoryBoardCreateComponent,
  ],
  providers: [
  ]
})
export class StoryBoardCreateModule { }
