import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { cartService } from '../../service/cartService';
import { DatePipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {

  orders: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private cart: cartService,
  ) { }

  status = "Processing";

 ngOnInit() {

  let user = JSON.parse(localStorage.getItem('user') || '{}');

  this.http.get(`https://localhost:7167/api/Order/GetOrders/${user.email}`)
    .subscribe({
      next: (res: any) => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

}
  getItemTotal(item: any) {
    return item.price * item.quantity;
  }


}
