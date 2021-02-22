import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { StoryBoardEditService } from '../story-board/story-board.services';
import { StoryboardCreateRequestParams } from '../story-board/story-board.interface';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/shared/shared.constants';
import { SharedService } from 'src/app/shared/shared.services';
import { Category } from 'src/app/shared/shared.interface';

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
    public categories: Category[] = [];
    private _storyBoardService: StoryBoardEditService;
    private _sharedService: SharedService;
    private _router: Router;
    public constructor(
        storyBoardService: StoryBoardEditService,
        sharedService: SharedService,
        fb: FormBuilder,
        router: Router
    ) {
        this._sharedService = sharedService;
        this._storyBoardService = storyBoardService;
        this._router = router;
        this.storyBoardForm = fb.group({
            title: ['', [Validators.required, Validators.maxLength(20)]],
            synopsis: [''],
            category: [null, [Validators.required]]
        });

        this.reader = new FileReader();
        this.reader.onload = (e: ProgressEvent<FileReader>) => {
            this.coverPortrait = e.target.result as string;
        };
    }

    public ngOnInit() {
        this._sharedService.GetCategories().subscribe((result) => {
            this.categories = result;
        });
    }

    public create() {
        // this.storyBoardCreateModel.title = this.title.value;
        // this.storyBoardCreateModel.synopsis = this.description.value;
        const selectedCategory = <Category>this.category.value;
        const params: StoryboardCreateRequestParams = {
            title: this.title.value,
            synopsis: this.synopsis.value,
            coverPortrait: this.coverPortrait,
            categoryId: selectedCategory.categoryId
        };
        this.submitted = true;
        console.log(params);
        this._storyBoardService.createStoryboard(params).subscribe((id) => {
            this._router.navigate([RoutePath.Studio_StoryBoard_Edit], { queryParams: { Id: id } });
        });
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
    get category() { return this.storyBoardForm.get('category'); }


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