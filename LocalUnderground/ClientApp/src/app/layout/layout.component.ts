import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../shared/shared.constants';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    private _router: Router;

    public constructor(
        router: Router,
        fb: FormBuilder
    ) {
        this._router = router;
    }

    public ngOnInit() {
        // this._billboardService.getCards().subscribe((cards) => {
        //     console.log(cards);
        // })
    }

    public navigateToStoryBoardCreate() {
        this._router.navigate([RoutePath.StoryBoardCreate]);
    }
}
