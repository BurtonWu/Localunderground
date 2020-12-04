import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestModel, StoryBoardCore } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';

@Component({
    selector: 'text-widget',
    templateUrl: './text-widget.component.html'
})

export class TextWidgetComponent implements OnInit {

    @Input() textForm: FormControl; 

    public _storyBoardService: StoryBoardService;
    public textWidgetForm: FormControl;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder
    ) {
        this._storyBoardService = storyBoardService;
    }

    public ngOnInit() {
    }

}

