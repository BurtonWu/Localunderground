import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-base.module';
import { BillboardComponent } from './billboard.component';
import { BillboardCreateComponent } from './billboard-create/billboard-create.component';
import { BillboardService } from './billboard.services';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from '../panel/panel.module';


@NgModule({
  declarations: [
    BillboardComponent,
    BillboardCreateComponent
  ],
  imports: [
    AppBaseModule,
    PanelModule
  ],
  exports: [
    BillboardComponent,
    BillboardCreateComponent
  ],
  providers: [
    BillboardService
  ]
})
export class BillboardModule { }
