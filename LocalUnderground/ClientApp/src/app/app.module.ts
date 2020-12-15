import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLoginModule } from './auth/auth-login.module';
import { AppRoutingModule } from './app-config/app-routing.module';
import { BillboardModule } from './billboard/billboard.module';
import { TokenInterceptorService } from './app-config/app-token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AppBaseModule } from './app-config/app-base.module';
import { HttpHeaderInterceptorService } from './app-config/app-httpheader-interceptor.service';
import { StoryBoardCreateModule } from './story-board-create/story-board-create.module';
import { LayoutModule } from './layout/layout.module';
import { StoryBoardModule } from './story-board/story-board.module';
import { StoryBoardListModule } from './story-board-list/story-board-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthLoginModule,

    LayoutModule,
    StoryBoardListModule,
    StoryBoardCreateModule,
    StoryBoardModule,
    // BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BillboardModule,
    BrowserAnimationsModule,
    NgbModule

    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, pathMatch: 'full' },
    //   { path: 'counter', component: CounterComponent },
    //   { path: 'fetch-data', component: FetchDataComponent },
    // ]),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
