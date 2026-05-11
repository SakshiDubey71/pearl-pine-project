import { Component } from '@angular/core';
import { cartService } from '../../service/cartService';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [NgFor,NgIf],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems:any[] =[];
  total=0;
  constructor(private cartServices : cartService, private router:Router){}
 
  ngOnInit(){
    this.cartItems= this.cartServices.getCart();
  
  }
  
 getTotal(){
  return this.cartServices.getTotalPrice();
 }
 getCount(){
  return this.cartItems.length;
 }

 remove(item:any){
  this.cartServices.remove(item);
  this.cartItems = this.cartServices.getCart();
 }


increase(item: any){

  if(item.quantity < item.stock)
  {
    item.quantity++;
    this.total = this.cartServices.getTotalPrice();

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  else
  {
    alert("Only " + item.stock + " items available in stock");
  }

}
decrease(item: any){

  if(item.quantity > 1)
  {
    item.quantity--;

    this.total = this.cartServices.getTotalPrice();

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

}

 goToCheckout(){
  this.router.navigate(['/checkout']);
 }


}


