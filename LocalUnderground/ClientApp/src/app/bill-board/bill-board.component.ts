import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { BillBoardService } from '../bill-board/bill-board.services';
import { BillBoardModule } from './bill-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetService } from '../text-widget/text-widget.services';
import { TextWidgetCreateParams, TextWidgetModel } from '../text-widget/text-widget.interface';
import { WidgetSortModel, WidgetSortParams, Widget } from '../widget/widget.interface';
import { WidgetType } from '../widget/widget.models';
import { WidgetService } from '../widget/widget.service';
import { NGB_DATEPICKER_18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';
import { TextWidgetComponent } from '../text-widget/text-widget.component';
import { ImageWidgetModel } from '../image-widget/image-widget.interface';
import { ImageWidgetService } from '../image-widget/image-widget.services';
import { ImageWidgetComponent } from '../image-widget/image-widget.component';
import { concat, concatMap } from 'rxjs/operators';
import { PostCardComponent } from '../post-card/post-card.component';
import { StoryBoardService } from '../story-board/story-board.services';
import { PostCardModel } from '../post-card/post-card.interface';

@Component({
    selector: 'bill-board',
    templateUrl: './bill-board.component.html',
})

export class BillBoardComponent implements OnInit, OnChanges {

    @Input() public model: any;
    @ViewChildren(PostCardComponent) postCardComponents: QueryList<PostCardComponent>;

    public postCards: PostCardModel[] = [];


    private _storyBoardService: StoryBoardService;
    private _textWidgetService: TextWidgetService;
    private _imageWidgetService: ImageWidgetService;
    private _widgetService: WidgetService;

    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder,
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        imageWidgetService: ImageWidgetService,
        modalService: NgbModal
    ) {
        this._storyBoardService = storyBoardService;
        this._textWidgetService = textWidgetService;
        this._imageWidgetService = imageWidgetService;
        this._widgetService = widgetService;
        this._modalService = modalService;


    }

    public ngOnInit() {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {

    }




    private _init() {
        this._storyBoardService.getStoryboards().subscribe((results) => {
            this.postCards = results.map((sb) => <PostCardModel>{
                storyBoardId: sb.id,
                title: sb.title,
                synopsis: sb.synopsis
            });
        });
    }



}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }