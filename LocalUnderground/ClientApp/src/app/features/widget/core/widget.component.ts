import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, FormArray, } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { concat, concatAll, concatMap } from 'rxjs/operators';
import { ImageWidgetEditComponent } from '../image-widget/image-widget-edit.component';
import { TextWidgetEditComponent } from '../text-widget/text-widget-edit.component';
import { TextWidgetModel } from '../text-widget/text-widget.interface';
import { ImageWidgetModel } from '../image-widget/image-widget.interface';
import { Widget, WidgetSortModel, WidgetSortParams } from './widget.interface';
import { TextWidgetService } from '../text-widget/text-widget.services';
import { ImageWidgetService } from '../image-widget/image-widget.services';
import { WidgetService } from './widget.service';
import { WidgetType } from './widget.models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'widget',
    templateUrl: './widget.component.html',
})

export class WidgetComponent implements OnInit, OnChanges {

    @Input() public storyBoardId: number;
    @Input() public widgets: Widget[];
    @ViewChildren(TextWidgetEditComponent) textWidgetComponents: QueryList<TextWidgetEditComponent>;
    @ViewChildren(ImageWidgetEditComponent) imageWidgetComponents: QueryList<ImageWidgetEditComponent>;


    public submitted: boolean;
    public storyBoardForm: FormGroup;
    public imageData: FormData;
    public textWidgets: TextWidgetModel[] = [];
    public imageWidgets: ImageWidgetModel[] = [];
    public isReady: boolean;
    public textWidgetModal: NgbModalRef;
    //test widget
    public textWidgetControls: FormArray = new FormArray([]);

    // public storyBoardCreateModel: StoryBoardModel;
    private _textWidgetService: TextWidgetService;
    private _imageWidgetService: ImageWidgetService;
    private _widgetService: WidgetService;
    private _route: ActivatedRoute;
    private _fb: FormBuilder;
    private _modalService: NgbModal;
    public dragging: boolean;

    public constructor(
        fb: FormBuilder,
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        imageWidgetService: ImageWidgetService,
        route: ActivatedRoute,
        modalService: NgbModal
    ) {
        this._textWidgetService = textWidgetService;
        this._imageWidgetService = imageWidgetService;
        this._widgetService = widgetService;
        this._modalService = modalService;
        this._route = route;
        this._fb = fb;
    }

    public ngOnInit() {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['widgets'] && changes['widgets'].currentValue) {
            this.isReady = true;
        }
    }

    public onWidgetDelete(widgetSortOrder: number) {
        this.widgets.splice(widgetSortOrder - 1, 1);
        this._saveWidgetOrder(true);
    }

    public drop(event: CdkDragDrop<TextWidgetModel[]>) {
        moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
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
            storyBoardId: this.storyBoardId,
            widgetType: WidgetType.Text
        };
        this.textWidgetControls.push(new FormControl(textWidget.body));
        this.widgets.push(textWidget);
    }

    public createImageWidget() {
        const imageWidget: ImageWidgetModel = {
            id: null,
            storyBoardId: this.storyBoardId,
            sort: this.widgets.length + 1,
            imageData: [],
            widgetType: WidgetType.Image
        };
        this.widgets.push(imageWidget);
    }

    public save() {
        this.submitted = true;

        var observables: Observable<any>[] = [];
        this.textWidgetComponents.forEach((widget) => {
            observables.push(widget.getSaveObservable());
        });

        this.imageWidgetComponents.forEach((widget) => {
            observables.push(widget.getSaveObservable());
        });

        forkJoin(observables).subscribe(() => {
            const sortModels = this.widgets.map((x) => <WidgetSortModel>{
                id: x.id,
                sort: x.sort,
                widgetType: x.widgetType
            });
            const params: WidgetSortParams = {
                storyBoardId: this.storyBoardId,
                widgetSortModels: sortModels
            };
            this._widgetService.updateWidgetSort(params).subscribe(() => { }, (error) => {
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

}