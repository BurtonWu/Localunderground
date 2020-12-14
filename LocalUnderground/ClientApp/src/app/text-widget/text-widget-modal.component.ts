import { Component, OnDestroy, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestModel, StoryBoardCore, TextWidgetModel } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';

@Component({
    selector: 'text-widget-modal',
    templateUrl: './text-widget-modal.component.html'
})

export class TextWidgetModalComponent implements OnInit, OnChanges {

    // @Input() model: TextWidgetModel;
    @Input() control: FormControl;
    @Input() submitted: boolean = false;
    
    public textForm: FormControl; 
    public _storyBoardService: StoryBoardService;
    public textWidgetForm: FormControl;
    public _fb: FormBuilder;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder
    ) {
        this._fb = fb;
        this._storyBoardService = storyBoardService;
    }

    public ngOnInit() {
    }

    public ngOnChanges(changes: SimpleChanges) {
        // if(changes['model']) {
        //     this.textForm = this._fb.control(this.model.body, Validators.required);
        // }
        if(changes['control']) {
            this.control.setValidators([Validators.required, Validators.minLength(5)]);
            this.control.updateValueAndValidity();
        }
    }

}

