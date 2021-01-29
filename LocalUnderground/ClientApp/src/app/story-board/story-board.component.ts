import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { StoryboardModel, StoryboardCreateRequestParams, StoryboardUpdateParams } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { StoryBoardModule } from './story-board.module';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetService } from '../text-widget/text-widget.services';
import { TextWidgetCreateParams, TextWidgetModel } from '../text-widget/text-widget.interface';
import { WidgetSortModel, WidgetSortParams } from '../widget/widget.interface';
import { WidgetType } from '../widget/widget.models';
import { WidgetService } from '../widget/widget.service';
import { NGB_DATEPICKER_18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';
import { TextWidgetComponent } from '../text-widget/text-widget.component';
import { ImageWidgetModel } from '../image-widget/image-widget.interface';

@Component({
    selector: 'story-board',
    templateUrl: './story-board.component.html',
    styleUrls: ['./story-board-style.css']
})

export class StoryBoardComponent implements OnInit, OnChanges {

    @Input() public model: StoryboardModel;
    @ViewChildren(TextWidgetComponent) textWidgetComponents: QueryList<TextWidgetComponent>;

    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public imageWidgets: ImageWidgetModel[] = [];

    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardService;
    private _textWidgetService: TextWidgetService;
    private _widgetService: WidgetService;

    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder,
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        modalService: NgbModal
    ) {
        this._storyBoardService = storyBoardService;
        this._textWidgetService = textWidgetService;
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
        this.textWidgets.splice(widgetSortOrder - 1, 1);
        this._saveWidgetOrder(true);
    }

    public loadWidgets() {
        this._textWidgetService.getWidgets(this.model.id).subscribe((textWidgets) => {
            console.log('text widgets', textWidgets);
            if (textWidgets && textWidgets.length > 0) {
                this.textWidgets = textWidgets;
                this.textWidgets.forEach((model) => {
                    const textFormControl = new FormControl(model.body);
                    this.textWidgetControls.push(textFormControl);
                });
            }
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
        console.log('drag start', event);
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
        const params: TextWidgetCreateParams = {
            sort: this.textWidgets.length + 1,
            storyBoardId: this.model.id
        };
        //maybe return the object that was saved...
        this._textWidgetService.createTextWidget(params).subscribe((id) => {
            console.log(id);
            const textWidget: TextWidgetModel = {
                id: id,
                body: '',
                sort: this.textWidgets.length + 1,
                storyBoardId: this.model.id
            };
            this.textWidgetControls.push(new FormControl(textWidget.body));
            this.textWidgets.push(textWidget);
            this._saveWidgetOrder();
        });
    }

    public createImageWidget() {
        const imageWidget: ImageWidgetModel = {
            id: 1,
            storyBoardId: this.model.id,
            sort: 1,
            base64Image: ''
        };
        this.imageWidgets.push(imageWidget);
    }

    public saveAll() {
        this.submitted = true;
        const params: StoryboardUpdateParams = {
            id: this.model.id,
            title: this.title.value,
            synopsis: this.synopsis.value
        };
        this.submitted = true;
        this._storyBoardService.udpateStoryboard(params).subscribe((id) => {
            console.log(id);
        });
        this.textWidgetComponents.forEach((widget) => {
            widget.save();
        });

    }

    private _saveWidgetOrder(assignSortOrder?: boolean) {
        if(assignSortOrder) {
            this.textWidgets.forEach((widget, i) => {
                widget.sort = i + 1;
                console.log(widget, i+1)
            });
        }
        this.textWidgets.sort(function(a, b) {
            if(a.sort > b.sort) return 1;
            else if (a.sort < b.sort) return -1;
            return 0
        });
        const sortModels = this.textWidgets.map((x) => <WidgetSortModel>{
            id: x.id,
            sort: x.sort,
            widgetType: WidgetType.Text
        });
        const params: WidgetSortParams = {
            widgetSortModels: sortModels
        };
        this._widgetService.updateWidgetSort(params).subscribe(() => { });
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