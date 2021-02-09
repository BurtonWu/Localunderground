import { NgModule } from '@angular/core';
import { AppBaseModule } from '../app-config/app-base.module';
import { BillBoardComponent } from './bill-board.component';
import { PostCardModule } from '../post-card/post-card.module';


@NgModule({
  declarations: [
    BillBoardComponent
  ],
  imports: [
    AppBaseModule,
    PostCardModule
  ],
  exports: [
    BillBoardComponent
  ],
  providers: [
  ]
})
export class BillBoardModule { }
