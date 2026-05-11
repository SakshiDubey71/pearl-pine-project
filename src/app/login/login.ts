import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user-service';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;




  form = new FormGroup({
  


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
    })
  });

  constructor(private userService: UserService, private router: Router,private http:HttpClient) { }

 login() {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const data = {
    email: this.form.value.email,
    password: this.form.value.password
  };

  this.http.post<any>('https://pearl-pine-backend.onrender.com/api/User/Login', data)
    .subscribe({
      next: (res) => {
        alert(res.message);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
