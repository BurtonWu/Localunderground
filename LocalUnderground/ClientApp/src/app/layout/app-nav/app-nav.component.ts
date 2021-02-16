import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../../shared/shared.constants';
import { debounceTime, filter } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/auth/auth.services';

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
    public isLoggedIn: boolean;
    private _router: Router;
    private _authService: AuthorizationService;

    public constructor(
        router: Router,
        fb: FormBuilder,
        authService: AuthorizationService
    ) {
        this._router = router;
        this._authService = authService;
        this.searchForm = fb.control(this.searchText);
        this.searchForm.valueChanges.pipe(filter( data => data.trim().length > 0 ),
        debounceTime(500))
        .subscribe((change) => {
            console.log(change);
        });
        this.isLoggedIn = authService.isAuthenticated();
        // this.searchForm.valueChanges.subscribe((word) => {console.log(word)})
    }

    public ngOnInit() {
        // this._billboardService.getCards().subscribe((cards) => {
        //     console.log(cards);
        // })
    }

    public navigateToStoryBoardCreate() {
        this._router.navigate([RoutePath.Studio_StoryBoard_Create]);
    }

    public navigateToStoryBoardStudio() {
        this._router.navigate([RoutePath.Studio]);
    }
    
    public navigateToLogin() {
        this._router.navigate([RoutePath.Login]);
    }

    public navigateToRegister() {
        this._router.navigate([RoutePath.Register]);
    }

    public logout() {
        this._authService.logout();
        this._router.navigate([RoutePath.BillBoard]);
    }
}
