import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageWidgetModel, ImageWidgetCreateParams, ImageWidgetUpdateParams } from './image-widget.interface';
import { ImageWidgetService } from './image-widget.services';
import { FormDataImageKeys } from './image-widget.models';
import { WidgetDeleteParams } from '../core/widget.interface';
import { map } from 'rxjs/operators';
import { WidgetService } from '../core/widget.service';
import { WidgetType } from '../core/widget.models';

@Component({
    selector: 'image-widget',
    templateUrl: './image-widget.component.html'
})

export class ImageWidgetComponent implements OnInit, OnChanges {

    @Input() public model: ImageWidgetModel;
    @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<TextWidgetModel>();


    // public submitted: boolean;
    // public bodyControl: FormControl;
    private _formData: FormData;
    private _imageWidgetService: ImageWidgetService;
    private _widgetService: WidgetService;
    // public textWidgetModal: NgbModalRef;
    // private _modalService: NgbModal;
    // private _fb: FormBuilder;

    public constructor(
        imageWidgetService: ImageWidgetService,
        widgetService: WidgetService,
        modalService: NgbModal,
        fb: FormBuilder
    ) {
        this._imageWidgetService = imageWidgetService;
        this._widgetService = widgetService;
        // this._modalService = modalService;
        // this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        // if (changes['model'].currentValue) {
        //     this.model.imageData
        // }
    }

    public ngOnInit() {

    }

    public imageUploadHandler(formData: FormData) {
        this._formData = formData;
    }

    private _getFormData() {
        // const formData = new FormData();
        // if(this.model.imageData && this.model.imageData.length > 0) {
        //     this.model.imageData.forEach((imageData, i) => {
        //         formData.append(FormDataImageKeys[i], atob(imageData.base64ImageData))
        //     });
        // }
        // return formData;
    }

    public delete() {
        const params: WidgetDeleteParams = {
            storyBoardId: this.model.storyBoardId,
            widgetId: this.model.id,
            widgetType: WidgetType.Image
        };
        this._widgetService.deleteWidget(params).subscribe(() => {
            this.isDeleted.emit(this.model.sort);
        });
    }

    public getSaveObservable() {
        if (this.model.id == null) {
            const params: ImageWidgetCreateParams = {
                sort: this.model.sort,
                storyBoardId: this.model.storyBoardId,
                imageData: this.model.imageData,
            };
            return this._imageWidgetService.createWidget(params).pipe(map((id) => {
                this.model.id = id;
            }));
        } else {
            const params: ImageWidgetUpdateParams = {
                id: this.model.id,
                imageData: this.model.imageData,
                sort: this.model.sort,
                storyBoardId: this.model.storyBoardId
            };
            return this._imageWidgetService.udpateWidget(params);
        }
    }

    // public delete() {  
    //     const params: WidgetDeleteParams = {
    //         storyBoardId: this.model.storyBoardId,
    //         widgetId: this.model.id,
    //         widgetType: WidgetType.Text
    //     };
    //     this._widgetService.deleteWidget(params).subscribe(() => {
    //         this.isDeleted.emit(this.model.sort);
    //         // this.modelChange.emit(this.model);
    //     })
    // }

    // public openTextWidgetModal() {
    //     this.textWidgetModal = this._modalService.open(TextWidgetModalComponent);
    //     console.log('clicked', event);
    //     this.textWidgetModal.componentInstance['model'] = this.model;
    //     console.log(this.textWidgetModal.componentInstance);
    //     console.log('active instances', this._modalService.activeInstances);
    //     this.textWidgetModal.componentInstance.event.subscribe(data => {
    //         console.log('Child component\'s event was triggered', data);
    //         this.model.body = data;
    //         this.bodyControl.setValue(data);
    //      });        
    // }

}

