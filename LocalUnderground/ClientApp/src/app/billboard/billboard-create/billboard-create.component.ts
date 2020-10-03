import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from '../billboard.services';

@Component({
    selector: 'billboard-create',
    templateUrl: './billboard-create.component.html'
})

export class BillboardCreateComponent implements OnInit {

    public submitted: boolean;

    public billboardForm: FormGroup;
    public emblem: string;
    public title: string;
    public description: string;
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        this.billboardForm = fb.group({
            title: [this.title, [Validators.required, Validators.maxLength(20)]],
            description: [this.description],
            emblem: [this.emblem],
        });
    }

    public ngOnInit() {
    }
}
