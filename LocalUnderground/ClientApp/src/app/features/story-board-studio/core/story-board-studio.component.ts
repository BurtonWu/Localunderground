import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardCore } from '../story-board-edit/story-board-edit.interface';
import { StoryBoardEditService } from '../story-board-edit/story-board-edit.services';
import { StoryBoardStudioCardModel } from './story-board-studio.interface';

@Component({
    selector: 'story-board-studio',
    templateUrl: './story-board-studio.component.html'
})

export class StoryBoardStudioComponent implements OnInit {

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
        console.log('studio');
        this._storyBoardService.getStoryBoardStudioCards().subscribe((studioCards) => {
            this.models = studioCards;
            if(this.models.length > 0) 
                this.activateModel(0);
        });
    }

    public activateModel(index: number) {
        this.models.forEach(m => m.selected = false);
        this.models[index].selected = true;
        this.selectedModel = this.models[index];
    }

    public delete(id: number) {
        // this._storyBoardService.deleteStoryboard(id).subscribe(() => {
        //     this._storyBoardService.getStoryboards().subscribe((storyBoards) => {
        //         this.storyBoardCores = storyBoards;
        //     });
        // })
    }
}

