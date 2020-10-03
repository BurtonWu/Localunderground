import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from '../billboard/billboard.services';
import { SharedService } from '../shared/shared.services';

@Component({
    selector: 'panel-create',
    templateUrl: './panel-create.component.html'
})

export class PanelCreateComponent {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    public billboardForm: FormGroup;
    private _sharedService: SharedService;

    public constructor(
        sharedService: SharedService,
        fb: FormBuilder
    ) {
        this._sharedService = sharedService;
        // this.loginForm = fb.group({
        //     username: new FormControl(this.username, Validators.required),
        //     password: new FormControl(this.password, Validators.required),
        // })
        // this.billboardForm = fb.group({
        //     imageUrl: [this.imageUrl, [Validators.required]],
        //     description: [this.description, [Validators.required]],
        // }, <AbstractControlOptions>{ updateOn: 'blur' });
    }

    // public create() {
    //     this.submitted = true;
    //     console.log(this.billboardForm);

    // }

    // public get imageUrlControl() {
    //     return this.billboardForm.get('imageUrl');
    // }

    // public get descriptionControl() {
    //     return this.billboardForm.get('description');
    // }

    
    public imageUploadHandler(emblem: FormData) {
        console.log('image upload handler');
        console.log(emblem);
        this._sharedService.uploadImage(emblem).subscribe((response) => {
            console.log(response);
        })
    }
}
