import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user-service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  showPassword = false;

  isSendingOtp = false;
  isVerifyingOtp = false;

  otpSent = false;
  otpVerified = false;
  serverOtp = '';

  phoneEntered = false;
  phoneVerified = false;



  constructor(private userService: UserService, private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef) { }

  form = new FormGroup({
    name: new FormControl(''),


    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)
      ]
    }),

    otp: new FormControl(''),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    address: new FormControl(''),
  });


  signup() {

  if (!this.otpVerified) {
    alert("Verify OTP first ⚠️");
    return;
  }

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  localStorage.setItem(
    'user',
    JSON.stringify(this.form.getRawValue())
  );

  alert("Signup Successful");

  this.router.navigate(['/login']);
}


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onPhoneInput() {
    const phone = this.form.value.phone;
    this.phoneEntered = !!phone && phone.length >= 10;
  }

  verifyPhone() {
    this.phoneVerified = true;
    alert("Phone Verified ✅");
  }


  sendOtp() {

  this.serverOtp =
    Math.floor(1000 + Math.random() * 9000).toString();

  alert("Your OTP is: " + this.serverOtp);

  this.otpSent = true;
}
  
verifyOtp() {

  if(this.form.value.otp == this.serverOtp){

    alert("OTP Verified");

    this.otpVerified = true;

    this.form.get('name')?.setValidators([
      Validators.required,
      Validators.minLength(3)
    ]);

    this.form.get('password')?.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)
    ]);

    this.form.get('phone')?.setValidators([
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]);

    this.form.get('address')?.setValidators([
      Validators.required
    ]);

    this.form.get('name')?.updateValueAndValidity();
    this.form.get('password')?.updateValueAndValidity();
    this.form.get('phone')?.updateValueAndValidity();
    this.form.get('address')?.updateValueAndValidity();

  }
  else{
    alert("Wrong OTP");
  }
}
}
