import { Component } from '@angular/core';
import { cartService } from '../../service/cartService';
import { Router } from '@angular/router';
import { PaymentService } from '../../service/payment-service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartItems: any[] = [];
  totalAmount = 0;
  constructor(private cart: cartService,
    private router: Router,
    private paymentS: PaymentService,
    private http: HttpClient
  ) { }

  ngOnInit() {
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


        let orders = JSON.parse(
          localStorage.getItem('orders') || '[]'
        );

        cart.forEach((item: any) => {

          orders.push({
            userEmail: user.email,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            totalAmount: item.price * item.quantity,
            orderDate: new Date()
          });

        });

        localStorage.setItem(
          'orders',
          JSON.stringify(orders)
        );

        alert("Payment Successful");

        this.cart.clearCart();

        this.router.navigate(['/orders']);
      }
    };

    let rzp = new (window as any).Razorpay(options);

    rzp.on('payment.failed', function () {
      alert("Payment Failed");
    });
    rzp.open();
  }
}




