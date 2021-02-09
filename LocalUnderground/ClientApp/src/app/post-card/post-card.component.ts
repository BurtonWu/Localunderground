import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestParams } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostCardService } from './post-card.services';
import { WidgetDeleteParams } from '../widget/widget.interface';
import { WidgetType } from '../widget/widget.models';
import { WidgetService } from '../widget/widget.service';
import { map } from 'rxjs/operators';
import { PostCardModel } from './post-card.interface';

@Component({
    selector: 'post-card',
    templateUrl: './post-card.component.html'
})

export class PostCardComponent implements OnInit, OnChanges {

    @Input() public model: PostCardModel;
    @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<PostCardModel>();


    public submitted: boolean;
    public bodyControl: FormControl;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;
    private _widgetService: WidgetService;

    public postCardModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        widgetService: WidgetService,
        modalService: NgbModal,
        fb: FormBuilder
    ) {
        this._widgetService = widgetService;
        this._modalService = modalService;
        this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
        }
    }

    public ngOnInit() {

    }


}

