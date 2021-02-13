import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { PostCardModel } from '../../bill-board/post-card/post-card.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from 'src/app/shared/shared.constants';
import { StoryBoardStudioCardModel } from '../core/studio.interface';

@Component({
    selector: 'story-board-card-info',
    templateUrl: './story-board-card-info.component.html'
})

export class StoryBoardCardInfoComponent implements OnInit, OnChanges {

    @Input() public model: StoryBoardStudioCardModel;
    @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<PostCardModel>();


    public submitted: boolean;
    public bodyControl: FormControl;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;
    private _router: Router;
    private _activatedRoute: ActivatedRoute;
    public postCardModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        modalService: NgbModal,
        fb: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute
    ) {
        this._modalService = modalService;
        this._fb = fb;
        this._router = router;
        this._activatedRoute = activatedRoute;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
        }
    }

    public ngOnInit() {

    }

    public navigateStoryBoardEdit() {
        this._router.navigate(['edit'], { relativeTo: this._activatedRoute, queryParams: { Id: this.model.id } });

    }

}

