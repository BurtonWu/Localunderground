import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { BillBoardModule } from './bill-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostCardModel } from '../post-card/post-card.interface';
import { PostCardComponent } from '../post-card/post-card.component';
import { BillBoardService } from './bill-board.services';

@Component({
    selector: 'bill-board',
    templateUrl: './bill-board.component.html',
})

export class BillBoardComponent implements OnInit, OnChanges {

    @Input() public model: any;
    @ViewChildren(PostCardComponent) postCardComponents: QueryList<PostCardComponent>;

    public postCards: PostCardModel[] = [];
    private _billBoardService: BillBoardService;
    private _modalService: NgbModal;

    public constructor(
        fb: FormBuilder,
        modalService: NgbModal,
        billBoardService: BillBoardService
    ) {
        this._modalService = modalService;
        this._billBoardService = billBoardService;
    }

    public ngOnInit() {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {

    }
    private _init() {
        this._billBoardService.getPostCards().subscribe((results) => {
            this.postCards = results;
        });
    }

}