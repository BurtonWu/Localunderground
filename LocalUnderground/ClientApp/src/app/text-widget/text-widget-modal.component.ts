import { Component, OnDestroy, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestModel, StoryBoardCore, TextWidgetModel } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'text-widget-modal',
    templateUrl: './text-widget-modal.component.html'
})

export class TextWidgetModalComponent implements OnInit, OnChanges {

    // @Input() model: TextWidgetModel;
    @Input() body: string;
    @Input() model: TextWidgetModel;

    public submitted: boolean = false;
    public formGroup: FormGroup;
    public textForm: FormControl;
    public textWidgetForm: FormControl;
    public _storyBoardService: StoryBoardService;
    public _modalService: NgbModal;
    public activeModal: NgbActiveModal;
    public _fb: FormBuilder;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder,
        modalService: NgbModal,
        activeModal: NgbActiveModal
    ) {
        this._fb = fb;
        this._storyBoardService = storyBoardService;
        this._modalService = modalService;
        this.activeModal = activeModal;

    }

    public ngOnInit() {
        this.formGroup = this._fb.group({ synopsis: [this.model.body, [Validators.required]] });
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

        this.model.body = this.formGroup.controls['synopsis'].value;
        this.activeModal.close();
    }

    get synopsis() { return this.formGroup.get('synopsis'); }

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

