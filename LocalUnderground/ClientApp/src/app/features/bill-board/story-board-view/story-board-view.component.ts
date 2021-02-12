import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { concat, concatMap } from 'rxjs/operators';
import { StoryBoardViewService } from './story-board-view.services';
import { StoryBoardViewModel } from './story-board-view.interface';
import { Widget } from '../../widget/core/widget.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'story-board-view',
    templateUrl: './story-board-view.component.html',
    styleUrls: ['./story-board-view-style.css']
})

export class StoryBoardViewComponent implements OnInit, OnChanges {

    @Input() public storyBoardId: number;
    // @ViewChildren(TextWidgetComponent) textWidgetComponents: QueryList<TextWidgetComponent>;
    // @ViewChildren(ImageWidgetComponent) imageWidgetComponents: QueryList<ImageWidgetComponent>;


    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public model: StoryBoardViewModel;
    public widgets: Widget[] = [];
    // public textWidgets: TextWidgetModel[] = [];
    // public imageWidgets: ImageWidgetModel[] = [];
    // public widgets: Widget[] = [];

    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardViewService;
    private _route: ActivatedRoute;

    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardViewService,
        fb: FormBuilder,
        route: ActivatedRoute,
        modalService: NgbModal
    ) {
        this._storyBoardService = storyBoardService;
        this._modalService = modalService;
        this._route = route;

        this.storyBoardForm = fb.group({
            title: ['default Title', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
            textWidgets: [[], [Validators.required]]
        });
    }

    public ngOnInit() {
        const storyBoardIdVal = this._route.snapshot.queryParamMap.get('Id');
        console.log(storyBoardIdVal);
        this.storyBoardId = parseInt(storyBoardIdVal);
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['id'].currentValue) {
            this._init();
        }
    }

    public _init() {
        this._storyBoardService.getStoryboardViewModel(this.storyBoardId).subscribe((model) => {
            this.model = model;
            console.log(model)
            this.widgets = this.widgets.concat(model.textWidgetModels);
            this.widgets = this.widgets.concat(model.imageWidgetModels);
            console.log(this.widgets);
        });
    }

}
