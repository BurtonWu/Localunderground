import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetService } from './text-widget.services';
import { TextWidgetUpdateParams, TextWidgetModel, TextWidgetCreateParams } from './text-widget.interface';
import { WidgetDeleteParams } from '../core/widget.interface';
import { map } from 'rxjs/operators';
import { WidgetService } from '../core/widget.service';
import { WidgetType } from '../core/widget.models';

@Component({
    selector: 'text-widget-view',
    templateUrl: './text-widget-view.component.html'
})

export class TextWidgetViewComponent implements OnInit, OnChanges {

    @Input() public model: TextWidgetModel;
    @Output() public isDeleted = new EventEmitter<number>();
    // @Output() public modelChange = new EventEmitter<TextWidgetModel>();


    public submitted: boolean;
    public bodyControl: FormControl;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;
    private _textWidgetService: TextWidgetService;
    private _widgetService: WidgetService;

    public textWidgetModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        textWidgetService: TextWidgetService,
        widgetService: WidgetService,
        modalService: NgbModal,
        fb: FormBuilder
    ) {
        this._textWidgetService = textWidgetService;
        this._widgetService = widgetService;
        this._modalService = modalService;
        this._fb = fb;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['model'].currentValue) {
            this.bodyControl = this._fb.control(this.model.body, [Validators.required, Validators.minLength(1)]);
        }
    }

    public ngOnInit() {

    }

    public delete() {
        const params: WidgetDeleteParams = {
            storyBoardId: this.model.storyBoardId,
            widgetId: this.model.id,
            widgetType: WidgetType.Text
        };
        this._widgetService.deleteWidget(params).subscribe(() => {
            this.isDeleted.emit(this.model.sort);
            // this.modelChange.emit(this.model);
        });
    }

    public openTextWidgetModal() {
        this.textWidgetModal = this._modalService.open(TextWidgetModalComponent);
        console.log('clicked', event);
        this.textWidgetModal.componentInstance['model'] = this.model;
        console.log(this.textWidgetModal.componentInstance);
        console.log('active instances', this._modalService.activeInstances);
        this.textWidgetModal.componentInstance.event.subscribe(data => {
            console.log('Child component\'s event was triggered', data);
            this.model.body = data;
            this.bodyControl.setValue(data);
        });
    }

}

