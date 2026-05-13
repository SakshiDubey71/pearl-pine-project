import { Component, Input } from '@angular/core';
import { cartService } from '../../service/cartService';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../service/user-service';
@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [NgIf],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
@Input() item : any;
constructor(private cartServices : cartService,
   private router : Router,
   private userService:UserService
  ){}

addToCart(){

  this.cartServices.addToCart(this.item);
  console.log("Added:", this.item); // alert remove
}
  

viewDetails(){
  this.router.navigate(['/product',this.item.id]);
}
notify(){

  let user = JSON.parse(
    localStorage.getItem('user') || 'null'
  );

  if(!user){
    alert("Please login first");
    return;
  }

  let notify = JSON.parse(
    localStorage.getItem('notify') || '[]'
  );

  notify.push({
    email:user.email,
    productId:this.item.id
  });

  localStorage.setItem(
    'notify',
    JSON.stringify(notify)
  );

  alert("You will be notified");
}
}
