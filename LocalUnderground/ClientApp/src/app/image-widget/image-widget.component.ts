import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryboardModel, StoryboardCreateRequestParams } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { WidgetDeleteParams } from '../widget/widget.interface';
import { WidgetType } from '../widget/widget.models';
import { WidgetService } from '../widget/widget.service';
import { ImageWidgetModel, ImageWidgetCreateParams, ImageWidgetUpdateParams } from './image-widget.interface';
import { FormDataImageKeys } from '../shared/shared.models';
import { ImageWidgetService } from './image-widget.services';

@Component({
    selector: 'image-widget',
    templateUrl: './image-widget.component.html'
})

export class ImageWidgetComponent implements OnInit, OnChanges {

    @Input() public model: ImageWidgetModel;
    // @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<TextWidgetModel>();


    // public submitted: boolean;
    // public bodyControl: FormControl;
    private _formData: FormData;
    // // public storyBoardCreateModel: StoryBoardModel;
    private _imageWidgetService: ImageWidgetService;
    // private _widgetService: WidgetService;

    // public textWidgetModal: NgbModalRef;
    // private _modalService: NgbModal;
    // private _fb: FormBuilder;

    public constructor(
        imageWidgetService: ImageWidgetService,
        modalService: NgbModal,
        fb: FormBuilder
    ) {
        this._imageWidgetService = imageWidgetService;
        // this._widgetService = widgetService;
        // this._modalService = modalService;
        // this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        // if (changes['model'].currentValue) {
        //     this.bodyControl = this._fb.control(this.model.body, [Validators.required, Validators.minLength(1)]);
        // }
    }

    public ngOnInit() {

    }

    public imageUploadHandler(formData: FormData) {
        this._formData = formData;
    }

    public save() {
        if(this._formData.has(FormDataImageKeys[0])) {
         
            if(this.model.id == null) {
                const params: ImageWidgetCreateParams = {
                    imageData: this._formData,
                    sort: this.model.sort,
                    storyBoardId: this.model.storyBoardId
                };
                this._imageWidgetService.createImageWidget(params).subscribe(() => {});
            } else {
                const params: ImageWidgetUpdateParams = {
                    id: this.model.id,
                    imageData: this._formData,
                    sort: this.model.sort,
                    storyBoardId: this.model.storyBoardId
                };
                this._imageWidgetService.udpateImageWidget(params).subscribe(() => {});
            }
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

