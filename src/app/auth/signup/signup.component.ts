import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
    templateUrl: './signup.component.html'
})

export class SignupComponent {
    isLoading = false;
    constructor(public authService: AuthService){}

    onLogin(form: NgForm) {
        if(form.invalid) {
            return;
        } 
        this.authService.createUser(form.value.email, form.value.password);
    }
}