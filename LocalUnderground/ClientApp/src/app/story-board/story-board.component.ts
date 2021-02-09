import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestParams, StoryboardUpdateParams } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { StoryBoardModule } from './story-board.module';
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

@Component({
    selector: 'story-board',
    templateUrl: './story-board.component.html',
    styleUrls: ['./story-board-style.css']
})

export class StoryBoardComponent implements OnInit, OnChanges {

    @Input() public model: StoryBoardModel;
    @ViewChildren(TextWidgetComponent) textWidgetComponents: QueryList<TextWidgetComponent>;
    @ViewChildren(ImageWidgetComponent) imageWidgetComponents: QueryList<ImageWidgetComponent>;


    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public imageWidgets: ImageWidgetModel[] = [];
    public widgets: Widget[] = [];

    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
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

        this.storyBoardForm = fb.group({
            title: ['default Title', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
            textWidgets: [[], [Validators.required]]
        });
    }

    public ngOnInit() {

    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
            console.log('model', this.model);
            this.loadWidgets();
        }
    }

    public onWidgetDelete(widgetSortOrder: number) {
        this.widgets.splice(widgetSortOrder - 1, 1);
        this._saveWidgetOrder(true);
    }

    public loadWidgets() {
        let promises: Promise<any>[] = [
            this._textWidgetService.getWidgets(this.model.id).toPromise(),
            this._imageWidgetService.getWidgets(this.model.id).toPromise()
        ];
        Promise.all(promises).then((results) => {
            const textWidgets: TextWidgetModel[] = results[0];
            if (textWidgets && textWidgets.length > 0) {
                this.textWidgets = textWidgets;
                this.widgets = this.widgets.concat(this.textWidgets);
                // this.textWidgets.forEach((model) => {
                //     const textFormControl = new FormControl(model.body);
                //     this.textWidgetControls.push(textFormControl);
                // });
            }
            const imageWidgets: ImageWidgetModel[] = results[1];
            if (imageWidgets && imageWidgets.length > 0) {
                this.imageWidgets = imageWidgets;
                this.widgets = this.widgets.concat(this.imageWidgets);
            }
            console.log(this.widgets);
        })
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
        observables.push(this._widgetService.updateWidgetSort(params));
        concatMap(concat(observables));
    }

    private _saveWidgetOrder(assignSortOrder?: boolean) {
        if(assignSortOrder) {
            this.widgets.forEach((widget, i) => {
                widget.sort = i + 1;
                console.log(widget, i+1)
            });
        }
        this.widgets.sort(function(a, b) {
            if(a.sort > b.sort) return 1;
            else if (a.sort < b.sort) return -1;
            return 0
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