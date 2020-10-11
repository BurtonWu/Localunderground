import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from './billboard.services';

@Component({
    selector: 'billboard',
    templateUrl: './billboard.component.html'
})

export class BillboardComponent implements OnInit {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    private _billboardService: BillboardService;

    public constructor(
        billboardService: BillboardService,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
    }

        public ngOnInit() {
            // this._billboardService.getCards().subscribe((cards) => {
            //     console.log(cards);
            // })
        }
}
