import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { StoryBoardModule } from './story-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { concat, concatAll, concatMap, map } from 'rxjs/operators';
import { StoryBoardModel, StoryboardUpdateParams } from './story-board.interface';
import { StoryBoardEditService } from './story-board.services';
import { ImageWidgetEditComponent } from '../../widget/image-widget/image-widget-edit.component';
import { TextWidgetEditComponent } from '../../widget/text-widget/text-widget-edit.component';
import { TextWidgetModel } from '../../widget/text-widget/text-widget.interface';
import { ImageWidgetModel } from '../../widget/image-widget/image-widget.interface';
import { Widget, WidgetSortModel, WidgetSortParams } from '../../widget/core/widget.interface';
import { TextWidgetService } from '../../widget/text-widget/text-widget.services';
import { ImageWidgetService } from '../../widget/image-widget/image-widget.services';
import { WidgetService } from '../../widget/core/widget.service';
import { WidgetType } from '../../widget/core/widget.models';
import { ActivatedRoute } from '@angular/router';
import { WidgetComponent } from '../../widget/core/widget.component';
import { StoryBoardEditModel } from '../../bill-board/story-board-view/story-board-view.interface';
import { Category } from 'src/app/shared/shared.interface';
import { SharedService } from 'src/app/shared/shared.services';

@Component({
    selector: 'story-board',
    templateUrl: './story-board.component.html',
    styleUrls: ['./story-board-style.css']
})

export class StoryBoardComponent implements OnInit, OnChanges {

    @ViewChild(WidgetComponent) widgetComponent: WidgetComponent;
    
    public model: StoryBoardEditModel;
    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public imageWidgets: ImageWidgetModel[] = [];
    public categories: Category[] = [];
    public widgets: Widget[] = [];
    public storyBoardId: number;
    public isReady: boolean;
    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardEditService;
    private _textWidgetService: TextWidgetService;
    private _imageWidgetService: ImageWidgetService;
    private _widgetService: WidgetService;
    private _sharedService: SharedService;
    private _route: ActivatedRoute;
    private _fb: FormBuilder;
    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardEditService,
        fb: FormBuilder,
        sharedService: SharedService,
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        imageWidgetService: ImageWidgetService,
        route: ActivatedRoute,
        modalService: NgbModal
    ) {
        this._sharedService = sharedService;
        this._storyBoardService = storyBoardService;
        this._textWidgetService = textWidgetService;
        this._imageWidgetService = imageWidgetService;
        this._widgetService = widgetService;
        this._modalService = modalService;
        this._route = route;
        this._fb = fb;
    }

    public ngOnInit() {
        const storyBoardIdVal = this._route.snapshot.queryParamMap.get('Id');
        this.storyBoardId = parseInt(storyBoardIdVal);
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    private _init() {
        // const observables: Observable<any>[] = [
        //     this._storyBoardService.getStoryboardEditModel(this.storyBoardId).pipe(map(model => {
        //         this.model = model;
        //         this.storyBoardForm = this._fb.group({
        //             title: [this.model.title, [Validators.required, Validators.maxLength(20)]],
        //             synopsis: [this.model.synopsis, [Validators.maxLength(50)]],
        //             category: [null, [Validators.required]]
        //         });
    
        //         this.widgets = this.widgets.concat(model.textWidgetModels);
        //         this.widgets = this.widgets.concat(model.imageWidgetModels);
        //         this.widgets.sort(function (a, b) {
        //             if (a.sort > b.sort) return 1;
        //             else if (a.sort < b.sort) return -1;
        //             return 0;
        //         });
        //     })),
        //     this._sharedService.GetCategories().pipe(map(categories => {
        //         this.categories = categories;
        //         const category = this.categories.find(x => x.categoryId == this.model.categoryId);
        //         this.storyBoardForm.controls['category'].setValue(category);
        //     }))
        // ];
        // forkJoin(observables).subscribe(() => {
        //     this.isReady = true;
        // }), (error) => {console.log(error)};

        let promise: Promise<any>[] = [
            this._storyBoardService.getStoryboardEditModel(this.storyBoardId).toPromise(),
            this._sharedService.GetCategories().toPromise()
        ];
        Promise.all(promise).then((results) => {
            this.model = results[0];
            this.storyBoardForm = this._fb.group({
                title: [this.model.title, [Validators.required, Validators.maxLength(20)]],
                synopsis: [this.model.synopsis, [Validators.maxLength(50)]],
                category: [null, [Validators.required]]
            });

            this.widgets = this.widgets.concat(this.model.textWidgetModels);
            this.widgets = this.widgets.concat(this.model.imageWidgetModels);
            this.widgets.sort(function (a, b) {
                if (a.sort > b.sort) return 1;
                else if (a.sort < b.sort) return -1;
                return 0;
            });

            this.categories = results[1];;
            const category = this.categories.find(x => x.categoryId == this.model.categoryId);
            this.storyBoardForm.controls['category'].setValue(category);

            this.isReady = true;
        });
    }

    public saveAll() {
        this.submitted = true;
        if(this.storyBoardForm.invalid) return;

        const selectedCategory = <Category>this.category.value;
        
        const storyBoardParams: StoryboardUpdateParams = {
            id: this.model.id,
            title: this.title.value,
            synopsis: this.synopsis.value,
            categoryId: selectedCategory.categoryId
        };
        this._storyBoardService.udpateStoryboard(storyBoardParams).subscribe();
        this.widgetComponent.save();
    }

    get title() { return this.storyBoardForm.get('title'); }
    get synopsis() { return this.storyBoardForm.get('synopsis'); }
    get category() { return this.storyBoardForm.get('category'); }

}
