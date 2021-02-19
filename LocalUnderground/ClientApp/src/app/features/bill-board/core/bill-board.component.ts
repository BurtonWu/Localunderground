import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { BillBoardModule } from './bill-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostCardGetParams, PostCardModel } from '../post-card/post-card.interface';
import { PostCardComponent } from '../post-card/post-card.component';
import { BillBoardService } from './bill-board.services';
import { SharedService } from 'src/app/shared/shared.services';
import { Category } from 'src/app/shared/shared.interface';

@Component({
    selector: 'bill-board',
    templateUrl: './bill-board.component.html',
})

export class BillBoardComponent implements OnInit, OnChanges {

    @Input() public model: any;
    @ViewChildren(PostCardComponent) postCardComponents: QueryList<PostCardComponent>;

    public postCards: PostCardModel[] = [];
    public categories: Category[] = [];
    private _billBoardService: BillBoardService;
    private _sharedService: SharedService;
    private _modalService: NgbModal;

    public constructor(
        fb: FormBuilder,
        modalService: NgbModal,
        billBoardService: BillBoardService,
        sharedService: SharedService
    ) {
        this._modalService = modalService;
        this._billBoardService = billBoardService;
        this._sharedService = sharedService;
    }

    public ngOnInit() {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {

    }

    public categoryFilter(index: number) {
        const category = this.categories[index];
        const params: PostCardGetParams = {
            categoryId: category.categoryId
        };
        this._billBoardService.getPostCards(params).subscribe((result) => {
            this.postCards = result;
        });
    }

    private _init() {
        let promises: Promise<any>[] = [
            this._billBoardService.getPostCards().toPromise(),
            this._sharedService.GetCategories().toPromise()    
        ];
        Promise.all(promises).then((results) => {
            this.postCards = results[0];
            this.categories = results[1];
        });
    }

}