import { NgModule } from '@angular/core';
import { AppBaseModule } from '../../../app-config/app-base.module';
import { BillBoardComponent } from './bill-board.component';
import { BillBoardService } from './bill-board.services';
import { PostCardModule } from '../post-card/post-card.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BillBoardComponent
  ],
  imports: [
    AppBaseModule,
    LayoutModule,
    PostCardModule
  ],
  exports: [
    BillBoardComponent
  ],
  providers: [
    BillBoardService
  ]
})
export class BillBoardModule { }
