import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostCardService } from './post-card.services';
import { map } from 'rxjs/operators';
import { PostCardModel } from './post-card.interface';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/shared/shared.constants';

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
    private _router: Router;

    // public storyBoardCreateModel: StoryBoardModel;

    public postCardModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        modalService: NgbModal,
        fb: FormBuilder,
        router: Router
    ) {
        this._router = router;
        this._modalService = modalService;
        this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
            console.log(this.model);
        }
    }

    public ngOnInit() {

    }

    public loadStoryBoardView() {
        this._router.navigate([RoutePath.StoryBoard_View], {queryParams: {Id: this.model.storyBoardId}});
    }
}

