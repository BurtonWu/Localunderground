import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { AppNavModule } from './app-nav/app-nav.module';
import { BillBoardModule } from '../features/bill-board/core/bill-board.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    AppBaseModule,
    AppNavModule
  ],
  exports: [
    LayoutComponent,
  ],
  providers: [
  ]
})
export class LayoutModule { }
