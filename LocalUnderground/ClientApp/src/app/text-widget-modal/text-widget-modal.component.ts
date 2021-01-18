import { Component, OnDestroy, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryboardModel, StoryboardCreateRequestModel, StoryBoardCore } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextWidgetService } from '../text-widget/text-widget.services';
import { TextWidgetUpdateParams, TextWidgetModel } from '../text-widget/text-widget.interface';

@Component({
    selector: 'text-widget-modal',
    templateUrl: './text-widget-modal.component.html'
})

export class TextWidgetModalComponent implements OnInit, OnChanges {

    // @Input() model: TextWidgetModel;
    @Input() body: string;
    @Input() model: TextWidgetModel;
    @Output() event = new EventEmitter<string>();

    public submitted: boolean = false;
    public formGroup: FormGroup;
    public textForm: FormControl;
    public textWidgetForm: FormControl;
    public _textWidgetService: TextWidgetService;
    public _modalService: NgbModal;
    public activeModal: NgbActiveModal;
    public _fb: FormBuilder;

    public constructor(
        textWidgetService: TextWidgetService,
        fb: FormBuilder,
        modalService: NgbModal,
        activeModal: NgbActiveModal
    ) {
        this._fb = fb;
        this._textWidgetService = textWidgetService;
        this._modalService = modalService;
        this.activeModal = activeModal;

    }

    public ngOnInit() {
        this.formGroup = this._fb.group({ body: [this.model.body, [Validators.required]] });
    }

    public ngOnChanges(changes: SimpleChanges) {
        // if(changes['model']) {
        //     this.textForm = this._fb.control(this.model.body, Validators.required);
        // }
        if (changes['model']) {
            // this.controlGroup = this._fb.group(['synopsis', [this.model.body, [Validators.required, Validators.minLength(5)]]]);
            // this.control.setValidators([Validators.required, Validators.minLength(5)]);
            // this.control.updateValueAndValidity();
        }
    }

    public save() {
        this.submitted = true;
        if(this.formGroup.invalid) return;

        this.model.body = this.bodyControl.value;
        const params: TextWidgetUpdateParams = {
            id: this.model.id,
            body: this.model.body,
            storyBoardId: this.model.storyBoardId,
            sort: this.model.sort
        }
        this._textWidgetService.udpateTextWidget(params).subscribe(() => {
            this.event.next(this.model.body);
            this.activeModal.close();
        });
    }

    get bodyControl() { return this.formGroup.get('body'); }

    // public open(content: any) {
    //     this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //     //   this.closeResult = `Closed with: ${result}`;
    //     console.log(result);
    //     }, (reason) => {
    //     //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     console.log('reason', reason);
    //     });
    //     console.log(content);
    //   }

}

