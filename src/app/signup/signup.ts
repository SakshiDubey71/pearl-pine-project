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

    this.userService.signupService(this.form.getRawValue())
      .subscribe({
        next: (res: any) => {
          alert(res.message);  // ✅ IMPORTANT FIX
        },
        error: () => {
          alert("Signup failed ❌");
        }
      });
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

    if (this.isSendingOtp) return;

    if (this.form.get('email')?.invalid) {
      this.form.get('email')?.markAsTouched();
      return;
    }

    this.otpSent = true;

    this.isSendingOtp = true;

    this.http.post<any>('https://pearl-pine-backend.onrender.com/api/User/SendOtp', {
      email: this.form.value.email
    }).subscribe({
      next: (res) => {
        alert(res.message);
        this.isSendingOtp = false;
      },
      error: () => {
        alert("Error sending OTP");
        this.isSendingOtp = false;
        this.otpSent = false; // rollback if error
      }
    });
  }



  verifyOtp() {

    if (this.isVerifyingOtp) return;

    if (!this.form.value.otp) {
      alert("Enter OTP");
      return;
    }
    this.isVerifyingOtp = true;

    this.http.post<any>('https://pearl-pine-backend.onrender.com/api/User/VerifyOtp', {
      email: this.form.value.email,
      otp: this.form.value.otp
    }).subscribe({
      next: (res) => {
        alert(res.message);
        Promise.resolve().then(() => {
          console.log("API RESPONSE:", res);

          this.otpVerified = true;  // 🔥 move here
          this.cd.detectChanges();
          this.form.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
          this.form.get('password')?.setValidators([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)
          ]);
          this.form.get('phone')?.setValidators([
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/)
          ]);
          this.form.get('address')?.setValidators([Validators.required]);

          this.form.get('name')?.updateValueAndValidity();
          this.form.get('password')?.updateValueAndValidity();
          this.form.get('phone')?.updateValueAndValidity();
          this.form.get('address')?.updateValueAndValidity();
        });
        this.isVerifyingOtp = false;
        console.log("otpVerified:", this.otpVerified);
      },
      error: () => {
        alert("Wrong OTP");
        this.isVerifyingOtp = false;
        this.otpVerified = false; // rollback
      }
    });
  }
}
