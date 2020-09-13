import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginCredentials } from './auth-login.interface';
import { AuthorizationService } from './auth-login.services';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControlOptions, } from '@angular/forms';

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

    public constructor(
        authService: AuthorizationService,
        fb: FormBuilder
    ) {
        this._authService = authService;
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
        });
    }

    public get usernameControl() {
        return this.loginForm.get('username');
    }

    public get passwordControl() {
        return this.loginForm.get('password');
    }
}
