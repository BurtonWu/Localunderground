import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { BillboardService } from '../billboard/billboard.services';

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html'
})

export class PanelComponent {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    public billboardForm: FormGroup;

    public constructor(
        fb: FormBuilder
    ) {
    }


}
