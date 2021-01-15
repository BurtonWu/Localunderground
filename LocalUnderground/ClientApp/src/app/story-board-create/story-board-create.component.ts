import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryboardModel, StoryboardCreateRequestModel } from '../story-board/story-board.interface';
import { StoryBoardService } from '../story-board/story-board.services';

@Component({
    selector: 'story-board-create',
    templateUrl: './story-board-create.component.html'
})

export class StoryBoardCreateComponent implements OnInit {

    public submitted: boolean;

    public storyBoardForm: FormGroup;
    public imageData: FormData;
    // public storyBoardCreateModel: StoryBoardModel;
    private _storyBoardService: StoryBoardService;

    public constructor(
        storyBoardService: StoryBoardService,
        fb: FormBuilder
    ) {
        this._storyBoardService = storyBoardService;
    
        this.storyBoardForm = fb.group({
            title: ['default Title', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
        });
    }

    public ngOnInit() {
        this._storyBoardService.getStoryboards().subscribe((storyBoards) => {
            console.log(storyBoards);
        });
    }

    public create() {
        // this.storyBoardCreateModel.title = this.title.value;
        // this.storyBoardCreateModel.synopsis = this.description.value;
        
        const params: StoryboardCreateRequestModel = {
            title: this.title.value,
            synopsis: this.synopsis.value
        };
        this.submitted = true;
        console.log(params);
        this._storyBoardService.createStoryboard(params).subscribe((id) => {
            console.log(id);
        })
        // this._billboardService.createBillboard(params).subscribe((response) => {
        //     console.log(response);
        //      this.submitted = false;
        // });
    }

 

    public imageUploadHandler(files: FileList) {
        const formData = new FormData();
        for(let i = 0; i < files.length; i++) {
            formData.append('imageData' + i, files.item(i), files.item(i).name);
        }
        this.imageData = formData;
    }

    get title() { return this.storyBoardForm.get('title'); }
    get synopsis() { return this.storyBoardForm.get('synopsis'); }

}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }