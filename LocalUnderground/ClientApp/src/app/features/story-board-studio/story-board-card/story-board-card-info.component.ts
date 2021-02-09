import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { PostCardModel } from '../../bill-board/post-card/post-card.interface';

@Component({
    selector: 'story-board-card-info',
    templateUrl: './story-board-card-info.component.html'
})

export class StoryBoardCardInfoComponent implements OnInit, OnChanges {

    @Input() public model: PostCardModel;
    @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<PostCardModel>();


    public submitted: boolean;
    public bodyControl: FormControl;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;

    public postCardModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        modalService: NgbModal,
        fb: FormBuilder
    ) {
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

