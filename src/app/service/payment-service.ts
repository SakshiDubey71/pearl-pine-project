import { Injectable } from '@angular/core';

  
declare var Razorpay: any;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  payNow(amount: number) {

    const options = {
      key: "rzp_test_SXjvvT366tmscH", // your key
      amount: amount * 100,
      currency: "INR",
      name: "Chocolate Store",
      description: "Order Payment",
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

      handler: function (response: any) {
        alert("Payment Successful\nPayment ID: " + response.razorpay_payment_id);
      },

      prefill: {
        name: "Test User",
        email: "test@gmail.com",
        contact: "9999999999"
      },

      theme: {
        color: "#ff4d4d"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
