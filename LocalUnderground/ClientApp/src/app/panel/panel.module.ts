import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppBaseModule } from '../app-config/app-base.module';
import { PanelCreateComponent } from '../panel/panel-create.component';
import { PanelComponent } from '../panel/panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PanelCreateComponent,
    PanelComponent,
  ],
  imports: [
    
    AppBaseModule
  ],
  exports: [
    PanelCreateComponent,
    PanelComponent,
  ],
  providers: [
  ]
})
export class PanelModule { }
