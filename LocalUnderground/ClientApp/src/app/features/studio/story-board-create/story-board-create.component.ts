import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardEditService } from '../story-board-edit/story-board-edit.services';
import { StoryboardCreateRequestParams } from '../story-board-edit/story-board-edit.interface';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/shared/shared.constants';

@Component({
    selector: 'story-board-create',
    templateUrl: './story-board-create.component.html'
})

export class StoryBoardCreateComponent implements OnInit {

    public submitted: boolean;

    public storyBoardForm: FormGroup = new FormGroup({});
    public imageData: FormData;
    public reader: FileReader;
    public coverPortrait: string;    
    private _storyBoardService: StoryBoardEditService;
    private _router: Router;
    public constructor(
        storyBoardService: StoryBoardEditService,
        fb: FormBuilder,
        router: Router
    ) {
        this._storyBoardService = storyBoardService;
        this._router = router;
        this.storyBoardForm = fb.group({
            title: ['', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
        });

        this.reader = new FileReader();
        this.reader.onload = (e: ProgressEvent<FileReader>) => {
            this.coverPortrait = e.target.result as string;
        };
    }

    public ngOnInit() {
        
    }

    public create() {
        // this.storyBoardCreateModel.title = this.title.value;
        // this.storyBoardCreateModel.synopsis = this.description.value;
        
        const params: StoryboardCreateRequestParams = {
            title: this.title.value,
            synopsis: this.synopsis.value,
            coverPortrait: this.coverPortrait
        };
        this.submitted = true;
        console.log(params);
        this._storyBoardService.createStoryboard(params).subscribe((id) => {
            this._router.navigate([RoutePath.Studio_StoryBoard_Edit], { queryParams: { Id: id } });
        })
        // this._billboardService.createBillboard(params).subscribe((response) => {
        //     console.log(response);
        //      this.submitted = false;
        // });
    }

    public imageUploadHandler(files: FileList) {
        const validatedFiles = this.validateImageFiles(files);
        if(validatedFiles.length == 1) {
            this.reader.readAsDataURL(validatedFiles[0]);
        } else {
            this.coverPortrait = null;
        }
    }

    get title() { return this.storyBoardForm.get('title'); }
    get synopsis() { return this.storyBoardForm.get('synopsis'); }

    private validateImageFiles(files: FileList): File[] {
        const validatedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type == 'image/jpeg' || files.item(i).type == 'image/png') {
                validatedFiles.push(files.item(i));
            }
        }
        return validatedFiles;
    }

}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }