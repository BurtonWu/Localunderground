import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardCore } from '../story-board/story-board.interface';
import { StoryBoardEditService } from '../story-board/story-board.services';
import { StoryBoardStudioCardModel } from './studio.interface';

@Component({
    selector: 'studio',
    templateUrl: './studio.component.html'
})

export class StudioComponent implements OnInit {

    public models: StoryBoardStudioCardModel[] = [];
    public selectedModel:StoryBoardStudioCardModel;
    private _storyBoardService: StoryBoardEditService;

    public constructor(
        storyBoardService: StoryBoardEditService,
        fb: FormBuilder
    ) {
        this._storyBoardService = storyBoardService;
    }

    public ngOnInit() {
        this._init();
    }

    public activateModel(index: number) {
        this.models.forEach(m => m.selected = false);
        this.models[index].selected = true;
        this.selectedModel = this.models[index];
    }

    public deleteStoryBoard(id: number) {
        this._storyBoardService.deleteStoryboard(id).subscribe(() => {
            this._init();
        })
    }

    private _init() {
        this._storyBoardService.getStoryBoardStudioCards().subscribe((studioCards) => {
            this.models = studioCards;
            if(this.models.length > 0) {
                this.activateModel(0);
            } else {
                this.selectedModel = null;
            }
        });
    }
}

