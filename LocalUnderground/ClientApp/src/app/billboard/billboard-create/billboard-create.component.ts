import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from '../billboard.services';
import { BillboardCreateRequestModel } from '../billboard.interface';

@Component({
    selector: 'billboard-create',
    templateUrl: './billboard-create.component.html'
})

export class BillboardCreateComponent implements OnInit {

    public submitted: boolean;

    public billboardForm: FormGroup;
    public imageData: FormData;
    public title: string = 'a'
    public description: string = 'b';
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        this.billboardForm = fb.group({
            // title: [this.title, [Validators.required, Validators.maxLength(20)]],
            description: [this.description],
            // emblem: [this.emblem],
        });
    }

    public ngOnInit() {
    }

    public create() {
        const params: BillboardCreateRequestModel = {
            title: this.title,
            description : this.description,
            imageData: this.imageData
        };
        console.log(params);
        this._billboardService.createBillboard(params).subscribe((response) => {
            console.log(response);
        });
    }

    public imageUploadHandler(files: FileList) {
        const formData = new FormData();
        for(let i = 0; i < files.length; i++) {
            formData.append('imageData' + i, files.item(i), files.item(i).name);
        }
        this.imageData = formData;
    }
}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }