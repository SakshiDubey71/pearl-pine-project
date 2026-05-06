import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class cartService {


  cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

saveCart(){
  localStorage.setItem('cart', JSON.stringify(this.cartItems));
}
  getCart(){
    return this.cartItems;
  }


addToCart(item: any){
  let existing = this.cartItems.find(x => x.id === item.id);

  if(existing){
    existing.quantity += 1;   // ✅ increase if already exists
  } else {
    item.quantity = 1;
    this.cartItems.push(item);
  }
  this.saveCart();
}

getTotalPrice(){
  let total = 0;
  for(let item of this.cartItems){
    total += item.price * item.quantity;
  }
  return total;
}
 remove(item:any){
  this.cartItems = this.cartItems.filter(x=>x.id!==item.id);
  this.saveCart();
 }
 clearCart() {
  localStorage.removeItem('cart');
}
}
