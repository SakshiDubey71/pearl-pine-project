import { Component } from '@angular/core';
import { cartService } from '../../service/cartService';
import { Router } from '@angular/router';
import { PaymentService } from '../../service/payment-service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports: [NgFor],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
    cartItems:any[] = [];
    totalAmount = 0;
  constructor(private cart: cartService, 
    private router: Router, 
    private paymentS :PaymentService,
     private http: HttpClient
  ) { }
   
  ngOnInit(){
    this.totalAmount = this.cart.getTotalPrice();
      this.cartItems = this.cart.getCart();
    }


pay() {

  let cart = this.cart.getCart();
  let user = JSON.parse(localStorage.getItem('user') || '{}');

  let total = this.totalAmount;

  let options: any = {
    key: "rzp_test_SXjvvT366tmscH", // ⚠️ replace with your key
    amount: total * 100,
    currency: "INR",
    name: "Pearl & Pine",
    description: "Order Payment",

    handler: (response: any) => {

      // ✅ AFTER PAYMENT SUCCESS → SAVE ORDER
      let orderData = cart.map((item: any) => ({
        userEmail: user.email,
        productName: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      this.http.post('https://pearl-pine-backend.onrender.com/api/Order/PlaceOrder', orderData)
        .subscribe(() => {
          alert("Payment Successful & Order Saved");
          this.cart.clearCart();
          this.router.navigate(['/orders']);
        });
    }
  };

  let rzp = new (window as any).Razorpay(options);

  rzp.on('payment.failed',function(){
    alert("Payment Failed");
  });
  rzp.open();
}
  }




