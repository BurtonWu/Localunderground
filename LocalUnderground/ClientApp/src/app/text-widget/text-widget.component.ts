import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryboardModel, StoryboardCreateRequestModel, TextWidgetModel } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetModalComponent } from '../text-widget-modal/text-widget-modal.component';
import { TextWidgetService } from './text-widget.services';
import { TextWidgetUpdateParams } from './text-widget.interface';

@Component({
    selector: 'text-widget',
    templateUrl: './text-widget.component.html'
})

export class TextWidgetComponent implements OnInit, OnChanges {

    @Input() public model: TextWidgetModel;

    public submitted: boolean;
    public bodyControl: FormControl;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;
    private _textWidgetService: TextWidgetService;
    public textWidgetModal: NgbModalRef;
    private _modalService: NgbModal;
    private _fb: FormBuilder;

    public constructor(
        textWidgetService: TextWidgetService,
        modalService: NgbModal,
        fb: FormBuilder
    ) {
        this._textWidgetService = textWidgetService;
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

    public save() {
        const params: TextWidgetUpdateParams = {
            id: this.model.id,
            body: this.model.body,
            sort: this.model.sort,
            storyBoardId: this.model.storyBoardId
        };
        this._textWidgetService.udpateTextWidget(params).subscribe(() => {

        })
    }

    public openTextWidgetModal() {
        this.textWidgetModal = this._modalService.open(TextWidgetModalComponent);
        console.log('clicked', event);
        this.textWidgetModal.componentInstance['model'] = this.model;
        console.log(this.textWidgetModal.componentInstance);
        console.log('active instances', this._modalService.activeInstances);
    }

}

