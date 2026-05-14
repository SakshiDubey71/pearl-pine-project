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

 
  let user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  if(
    this.form.value.email == user.email &&
    this.form.value.password == user.password
  ){

    alert("Login Successful");

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    window.location.href='/home';
  }
  else{
    alert("Invalid Email or Password");
  }
}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
