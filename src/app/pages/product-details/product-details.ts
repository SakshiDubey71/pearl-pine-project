import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user-service';
import { ChangeDetectorRef } from '@angular/core';
import { cartService } from '../../service/cartService';
import { ProductCard } from "../../components/product-card/product-card";
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, ProductCard,NgFor],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product: any;
  relatedProducts:any[] = [];
allProducts:any[] = [];
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private cartServices:cartService
  ) { }
ngOnInit() {

  this.route.paramMap.subscribe(params => {

    let id = params.get('id');

    this.userService.getProducts().subscribe((res:any) => {

      this.allProducts = res;

      // Current product
      this.product = res.find(
        (x:any) => Number(x.id) === Number(id)
      );

      console.log("FOUND PRODUCT:", this.product);

      // Related products
      this.relatedProducts = this.allProducts.filter(
        (p:any) =>
          p.category === this.product.category &&
          p.id !== this.product.id
      );

      console.log("RELATED:", this.relatedProducts);

      this.cdr.detectChanges();

    });

  });

}
  notify(){

  let user = JSON.parse(
    localStorage.getItem('user') || 'null'
  );

  if(!user){
    alert("Please login first");
    return;
  }

  let notifications = JSON.parse(
    localStorage.getItem('notify') || '[]'
  );

  notifications.push({
    email:user.email,
    productId:this.product.id
  });

  localStorage.setItem(
    'notify',
    JSON.stringify(notifications)
  );

  alert("Notification Saved");
}
addToCart(){

  this.cartServices.addToCart(this.product);

  alert("Added To Cart");
}
}
