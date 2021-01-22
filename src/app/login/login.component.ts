import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BankDetailsService } from '../bank-details.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  err = false;

  email: string;
  password: string;
  userId: number;

  alertType: string;
  // tslint:disable-next-line:no-inferrable-types
  displayAlert: boolean = false;
  alertMessage: string;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private bankDetailsService: BankDetailsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.http
      .get('http://localhost:3000/login').subscribe((res: any) => {
        console.log(res[0].email);
        if ((res[0].email === this.loginForm.value.email) && (res[0].password === this.loginForm.value.password)) {
          this.bankDetailsService.updateLoginStatus(true);
          const test = true;
          localStorage.setItem('test', JSON.stringify(test));
          this.router.navigate(['/dashboard']);
        } else {
          this.alertType = 'danger';
          this.displayAlert = true;
          this.alertMessage = ` ${this.loginForm.value.email} or incorrect  password`;
        }
      }, (err: HttpErrorResponse) => {
        this.err = true;
        if (err) {
          // alert(err.error.message);
          // this.alertType = 'danger';
          // this.displayAlert = true;
          // this.alertMessage = ` ${err.error.message} or incorrect  password`;
        }
        console.log('rerror', err);
        // alert(err.message);
      });
  }

  closeAlert() {
    this.displayAlert = false;
    this.loginForm.reset();

  }

}
