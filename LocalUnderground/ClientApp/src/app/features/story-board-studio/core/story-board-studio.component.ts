import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardCore } from '../story-board-edit/core/story-board-edit.interface';
import { StoryBoardEditService } from '../story-board-edit/core/story-board-edit.services';

@Component({
    selector: 'story-board-studio',
    templateUrl: './story-board-studio.component.html'
})

export class StoryBoardStudioComponent implements OnInit {

    public storyBoardCores: StoryBoardCore[] = [];
    private _storyBoardService: StoryBoardEditService;

    public constructor(
        storyBoardService: StoryBoardEditService,
        fb: FormBuilder
    ) {
        this._storyBoardService = storyBoardService;
    }

    public ngOnInit() {
        // this._storyBoardService.getStoryboards().subscribe((storyBoards) => {
        //     this.storyBoardCores = storyBoards;
        // });
    }

    public delete(id: number) {
        // this._storyBoardService.deleteStoryboard(id).subscribe(() => {
        //     this._storyBoardService.getStoryboards().subscribe((storyBoards) => {
        //         this.storyBoardCores = storyBoards;
        //     });
        // })
    }
}

