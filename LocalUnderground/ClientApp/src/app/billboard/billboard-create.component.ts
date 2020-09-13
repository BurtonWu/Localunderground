import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from './billboard-create.services';

@Component({
    selector: 'billboard-create',
    templateUrl: './billboard-create.component.html'
})

export class BillboardCreateComponent {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    public billboardForm: FormGroup;
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        // this.loginForm = fb.group({
        //     username: new FormControl(this.username, Validators.required),
        //     password: new FormControl(this.password, Validators.required),
        // })
        this.billboardForm = fb.group({
            imageUrl: [this.imageUrl, [Validators.required]],
            description: [this.description, [Validators.required]],
        }, <AbstractControlOptions>{ updateOn: 'blur' });
    }

    public create() {
        this.submitted = true;
        console.log(this.billboardForm);
        this._billboardService.create(this.billboardForm.value).subscribe((response) => {
            console.log(response);
        });
    }

    public get imageUrlControl() {
        return this.billboardForm.get('imageUrl');
    }

    public get descriptionControl() {
        return this.billboardForm.get('description');
    }
}
