import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLoginModule } from './auth/auth-login.module';
import { AppRoutingModule } from './app-routing.module';
import { BillboardModule } from './billboard/billboard-create.module';

@NgModule({
  declarations: [


    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,


    AppRoutingModule,
    AuthLoginModule,
    BillboardModule,
    // BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserModule,
    HttpClientModule,




    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, pathMatch: 'full' },
    //   { path: 'counter', component: CounterComponent },
    //   { path: 'fetch-data', component: FetchDataComponent },
    // ]),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
