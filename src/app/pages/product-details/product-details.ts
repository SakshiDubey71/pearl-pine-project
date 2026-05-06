import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user-service';
import { ChangeDetectorRef } from '@angular/core';
import { cartService } from '../../service/cartService';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product: any;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private cartServices:cartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.userService.getProducts().subscribe(res => {
        console.log("ALL PRODUCTS:", res);

        this.product = res.find((x: any) => Number(x.id) === Number(id));
        console.log("ALL PRODUCTS:", res);

        console.log("SELECTED ID:", id);
        console.log("FOUND PRODUCT:", this.product);
        
        this.cdr.detectChanges();

      });
    });
  }
  notify(){
  let user = JSON.parse(localStorage.getItem('user') || 'null');

  if(!user){
    alert("Please login first");
    return;
  }

  this.userService.notifyUser({
    email: user.email,
    productId: this.product.id
  }).subscribe(()=>{
    alert("Notification Saved");
  });
}
addToCart(){

  this.cartServices.addToCart(this.product);
  console.log("Added:", this.product); // alert remove
}
}
