import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginCredentials } from './auth-login.interface';
import { AuthorizationService } from './auth.services';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../shared/shared.constants';

@Component({
    selector: 'auth-login',
    templateUrl: './auth-login.component.html'
})

export class AuthLoginComponent {

    public username: string;
    public password: string;
    public submitted: boolean;
    public loginForm: FormGroup;
    private _authService: AuthorizationService;
    private _router: Router;

    public constructor(
        authService: AuthorizationService,
        fb: FormBuilder,
        router: Router
    ) {
        this._authService = authService;
        this._router = router;
        // this.loginForm = fb.group({
        //     username: new FormControl(this.username, Validators.required),
        //     password: new FormControl(this.password, Validators.required),
        // })
        this.loginForm = fb.group({
            username: [this.username, [Validators.required]],
            password: [this.password, [Validators.required]],
        }, <AbstractControlOptions>{ updateOn: 'blur' });
    }

    public submit() {
        this.submitted = true;
        console.log(this.loginForm);
        this._authService.login(this.loginForm.value).subscribe((response) => {
            console.log(response);
            this._authService.saveToken(response['token']);
            this._router.navigate([RoutePath.BillBoard]);
        });
    }

    public get usernameControl() {
        return this.loginForm.get('username');
    }

    public get passwordControl() {
        return this.loginForm.get('password');
    }
}
