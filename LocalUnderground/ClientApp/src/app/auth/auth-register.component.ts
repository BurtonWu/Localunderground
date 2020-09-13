import { Component } from '@angular/core';
import { RegisterUserModel } from './auth-login.interface';
import { AuthorizationService } from './auth-login.services';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';

@Component({
    selector: 'auth-register',
    templateUrl: './auth-register.component.html'
})

export class AuthRegisterComponent {

    public registerForm: FormGroup;
    public username: string;
    public password: string;
    public email: string;
    public submitted: boolean;
    private authService: AuthorizationService;

    public constructor(
        authService: AuthorizationService,
        fb: FormBuilder) {
        this.authService = authService;
        this.registerForm = fb.group({
            username: [this.username, Validators.required],
            password: [this.username, Validators.required],
            email: [this.email, Validators.required],
        }, <AbstractControlOptions>{ updateOn: 'blur' });
    }

    public register() {
        this.submitted = true;
        console.log(this.registerForm);
        // const loginCredentails: RegisterUserModel = this.registerForm.value;
        this.authService.register(this.registerForm.value).subscribe((response) => { console.log(response);});
    }

    public get usernameControl() {
        return this.registerForm.get('username');
    }

    public get passwordControl() {
        return this.registerForm.get('password');
    }

    public get emailControl() {
        return this.registerForm.get('email');
    }
}
