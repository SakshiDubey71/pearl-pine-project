import { Component } from '@angular/core';
import { cartService } from '../../service/cartService';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
user:any;
  constructor(private cartServices : cartService){}
   ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
   }
  getCount(){
    return this.cartServices.getCart().length;
  }
  logout(){
  localStorage.removeItem('user');
  this.user = null;
}
get userName(){
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.name;
}
}
