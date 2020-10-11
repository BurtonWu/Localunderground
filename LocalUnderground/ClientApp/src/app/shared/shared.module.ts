import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-base.module';
import { DndComponent } from './dnd.component';
import { SharedService } from './shared.services';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DndComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DndComponent
  ],
  providers: [
    
  ]
})
export class SharedModule { }
