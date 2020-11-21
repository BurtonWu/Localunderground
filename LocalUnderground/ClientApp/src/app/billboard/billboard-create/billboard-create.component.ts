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
    public title: string = ''
    public description: string = '';
    public price: number;
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        this.billboardForm = fb.group({
            title: [this.title, [Validators.required, Validators.maxLength(20)]],
            description: [this.description],
            price: [this.price, [Validators.required]],
            // emblem: [this.emblem],
        });
    }

    public ngOnInit() {
    }

    public create() {
        const params: BillboardCreateRequestModel = {
            title: this.title,
            description: this.description,
            categoryId: 1,
            categoryName: '',
            price: 1,
            byteData1: this.imageData
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