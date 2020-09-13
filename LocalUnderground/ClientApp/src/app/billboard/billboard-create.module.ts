import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-base.module';
import { BillboardCreateComponent } from './billboard-create.component';
import { BillboardService } from './billboard-create.services';


@NgModule({
  declarations: [
    BillboardCreateComponent,
  ],
  imports: [
    FormsModule,
    AppBaseModule
  ],
  exports: [
    BillboardCreateComponent,
  ],
  providers: [
    BillboardService
  ]
})
export class BillboardModule { }
