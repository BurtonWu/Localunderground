import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { PostCardModel } from './post-card.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '../../../shared/shared.constants';
import { attachDataImagePrefix } from '../../../shared/shared.models';

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
    private _activatedRoute: ActivatedRoute;
    // public storyBoardCreateModel: StoryBoardModel;

    public postCardModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        modalService: NgbModal,
        fb: FormBuilder,
        activatedRoute: ActivatedRoute,
        router: Router
    ) {
        this._router = router;
        this._activatedRoute = activatedRoute;
        this._modalService = modalService;
        this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
            this.model.coverPortrait = attachDataImagePrefix(this.model.coverPortrait);
            console.log(this.model);
        }
    }

    public ngOnInit() {

    }

    public loadStoryBoardView() {
        this._router.navigate([RoutePath.StoryBoard_View], { relativeTo: this._activatedRoute, queryParams: { Id: this.model.storyBoardId } });

    }
}

