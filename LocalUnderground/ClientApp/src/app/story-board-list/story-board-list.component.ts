import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardModel, StoryboardCreateRequestModel, StoryBoardCore } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';

@Component({
    selector: 'story-board-list',
    templateUrl: './story-board-list.component.html'
})

export class StoryBoardListComponent implements OnInit {

    public storyBoardCores: StoryBoardCore[] = [];
    private _storyBoardService: StoryBoardService;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder
    ) {
        this._storyBoardService = storyBoardService;
    }

    public ngOnInit() {
        this._storyBoardService.getStoryboards().subscribe((storyBoards) => {
            this.storyBoardCores = storyBoards;
        });
    }

}

