import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from './billboard.services';
import { Router } from '@angular/router';
import { RoutePath } from '../shared/shared.constants';

@Component({
    selector: 'billboard',
    templateUrl: './billboard.component.html'
})

export class BillboardComponent implements OnInit {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    private _billboardService: BillboardService;
    private _router: Router;

    public constructor(
        billboardService: BillboardService,
        router: Router,
        fb: FormBuilder
    ) {
        this._billboardService = billboardService;
        this._router = router;
    }

    public ngOnInit() {
        // this._billboardService.getCards().subscribe((cards) => {
        //     console.log(cards);
        // })
    }

    public navigateToBillboard() {
        this._router.navigate([RoutePath.Billboard_Create]);
    }
}
