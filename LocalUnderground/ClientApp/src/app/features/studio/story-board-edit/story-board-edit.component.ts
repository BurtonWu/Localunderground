import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { StoryBoardEditModule } from './story-board-edit.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { concat, concatAll, concatMap } from 'rxjs/operators';
import { StoryBoardModel, StoryboardUpdateParams } from './story-board-edit.interface';
import { StoryBoardEditService } from './story-board-edit.services';
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

@Component({
    selector: 'story-board-edit',
    templateUrl: './story-board-edit.component.html',
    styleUrls: ['./story-board-edit-style.css']
})

export class StoryBoardEditComponent implements OnInit, OnChanges {

    @Input() public model: StoryBoardModel;
    @ViewChildren(TextWidgetEditComponent) textWidgetComponents: QueryList<TextWidgetEditComponent>;
    @ViewChildren(ImageWidgetEditComponent) imageWidgetComponents: QueryList<ImageWidgetEditComponent>;


    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public imageWidgets: ImageWidgetModel[] = [];
    public widgets: Widget[] = [];
    public storyBoardId: number;

    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardEditService;
    private _textWidgetService: TextWidgetService;
    private _imageWidgetService: ImageWidgetService;
    private _widgetService: WidgetService;
    private _route: ActivatedRoute;

    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardEditService,
        fb: FormBuilder,
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        imageWidgetService: ImageWidgetService,
        route: ActivatedRoute,
        modalService: NgbModal
    ) {
        this._storyBoardService = storyBoardService;
        this._textWidgetService = textWidgetService;
        this._imageWidgetService = imageWidgetService;
        this._widgetService = widgetService;
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
        this.storyBoardId = parseInt(storyBoardIdVal);
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public onWidgetDelete(widgetSortOrder: number) {
        this.widgets.splice(widgetSortOrder - 1, 1);
        this._saveWidgetOrder(true);
    }

    private _init() {
        this._storyBoardService.getStoryboardEditModel(this.storyBoardId).subscribe((model) => {
            this.model = model;
            console.log(model);
            this.widgets = this.widgets.concat(model.textWidgetModels);
            this.widgets = this.widgets.concat(model.imageWidgetModels);
            console.log(this.widgets);
        });
    }

    public drop(event: CdkDragDrop<TextWidgetModel[]>) {
        console.log('drop', event);
        // this.textWidgets.forEach(function(widget, i) {
        //     widget.sort = i + 1;
        //     this[i].sort = i + 1;
        //     console.log(this[i], i+1)
        // }, this.textWidgets);

        console.log(this.textWidgets);
        moveItemInArray(this.textWidgets, event.previousIndex, event.currentIndex);
        this._saveWidgetOrder(true);
    }

    public handleDragStart(event: CdkDragStart): void {
        console.log('drag start', event.source.element);
        this.dragging = true;
    }

    public handleClick(textWidget: TextWidgetModel, index: number): void {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        // this.textWidgetModal.open(null);
        // this.textWidgetModal = this._modalService.open(TextWidgetModalComponent);
        // console.log('clicked', event);
        // this.textWidgetModal.componentInstance['model'] = textWidget;
        // console.log(this.textWidgetModal.componentInstance);
        // console.log('active instances', this._modalService.activeInstances);
    }

    //after create, retrieve using a get
    public createTextWidget() {
        const textWidget: TextWidgetModel = {
            body: '',
            sort: this.widgets.length + 1,
            storyBoardId: this.model.id,
            widgetType: WidgetType.Text
        };
        this.textWidgetControls.push(new FormControl(textWidget.body));
        this.widgets.push(textWidget);
    }

    public createImageWidget() {
        const imageWidget: ImageWidgetModel = {
            id: null,
            storyBoardId: this.model.id,
            sort: this.widgets.length + 1,
            imageData: [],
            widgetType: WidgetType.Image
        };
        this.widgets.push(imageWidget);
    }

    public saveAll() {
        this.submitted = true;
        var observables: Observable<any>[] = [];

        const storyBoardParams: StoryboardUpdateParams = {
            id: this.model.id,
            title: this.title.value,
            synopsis: this.synopsis.value
        };
        observables.push(this._storyBoardService.udpateStoryboard(storyBoardParams));

        this.textWidgetComponents.forEach((widget) => {
            observables.push(widget.getSaveObservable());
        });

        this.imageWidgetComponents.forEach((widget) => {
            observables.push(widget.getSaveObservable());
        });

        const sortModels = this.widgets.map((x) => <WidgetSortModel>{
            id: x.id,
            sort: x.sort,
            widgetType: x.widgetType
        });
        const params: WidgetSortParams = {
            storyBoardId: this.model.id,
            widgetSortModels: sortModels
        };
        observables.push();
        forkJoin(observables).subscribe(() => {
            this._widgetService.updateWidgetSort(params).subscribe(() => { }, (error) => {
                console.log(error);
            });
        }, (error) => { console.log(error); });
    }

    private _saveWidgetOrder(assignSortOrder?: boolean) {
        if (assignSortOrder) {
            this.widgets.forEach((widget, i) => {
                widget.sort = i + 1;
                console.log(widget, i + 1);
            });
        }
        this.widgets.sort(function (a, b) {
            if (a.sort > b.sort) return 1;
            else if (a.sort < b.sort) return -1;
            return 0;
        });

    }

    public imageUploadHandler(files: FileList) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('imageData' + i, files.item(i), files.item(i).name);
        }
        this.imageData = formData;
    }

    get title() { return this.storyBoardForm.get('title'); }
    get synopsis() { return this.storyBoardForm.get('synopsis'); }

}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }