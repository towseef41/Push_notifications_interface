import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/apiServices/api.service';
import { CustomValidator } from '../Common/customValidations/customValidations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  spinner: boolean;
  role: string;
  hide = true;
  errorMsg: string;

  constructor(private router: Router, private apiService: ApiService) {
    this.loginForm = new FormGroup({
      Phone: new FormControl('', [
        Validators.required,
        CustomValidator.phoneValidator,
        Validators.minLength(10),
      ]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.spinner = true;
    this.apiService.login(this.loginForm.value).subscribe(
      (data: any) => {
        if (data.token) {
          localStorage.setItem('ACCESS_TOKEN', data.token);
          this.spinner = false;
          this.router.navigate(['/notifications']);
        }
      },
      (error) => {
        this.spinner = false;
        console.error(error.error.Message);
        this.errorMsg = error.error.Message;
      }
    );
  }
}
