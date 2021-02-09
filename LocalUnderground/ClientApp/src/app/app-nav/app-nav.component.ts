import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../shared/shared.constants';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './app-nav.component.html'
})

export class AppNavComponent implements OnInit {

    public imageUrl: string;
    public description: string;
    public submitted: boolean;
    public searchForm: FormControl;
    public searchText: string;
    private _router: Router;

    public constructor(
        router: Router,
        fb: FormBuilder
    ) {
        this._router = router;
        this.searchForm = fb.control(this.searchText);
        this.searchForm.valueChanges.pipe(filter( data => data.trim().length > 0 ),
        debounceTime(500))
        .subscribe((change) => {
            console.log(change);
        })
        // this.searchForm.valueChanges.subscribe((word) => {console.log(word)})
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
