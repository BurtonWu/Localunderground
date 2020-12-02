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
    public billboardCreateRequestModel: BillboardCreateRequestModel;
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        this.billboardCreateRequestModel = {
            byteData1: null,
            categoryId: null,
            categoryName: null,
            description: null,
            price: null,
            title: null
        }
        this.billboardForm = fb.group({
            title: [this.billboardCreateRequestModel.title, [Validators.required, Validators.maxLength(20)]],
            description: [this.billboardCreateRequestModel.description],
            price: [this.billboardCreateRequestModel.price, [Validators.required]],
            // emblem: [this.emblem],
        });
    }

    public ngOnInit() {
    }

    public create() {
        const params: BillboardCreateRequestModel = {
            title: this.billboardForm.get('title').value,
            description: this.billboardForm.get('description').value,
            categoryId: 1,
            categoryName: '',
            price: this.billboardForm.get('price').value,
            byteData1: this.imageData
        };
        this.billboardCreateRequestModel.title = this.title.value;
        this.billboardCreateRequestModel.description = this.description.value;
        this.billboardCreateRequestModel.price = this.price.value;

        console.log(this.billboardForm, this.billboardCreateRequestModel);
        this.submitted = true;
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

    get title() { return this.billboardForm.get('title'); }
    get description() { return this.billboardForm.get('description'); }
    get price() { return this.billboardForm.get('price'); }

}


// if(req.body as FormData && req.method == "POST") {
//     req.headers.append('enctype', 'multipart/form-data');
// }