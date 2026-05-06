import { Component } from '@angular/core';
import { UserService } from '../service/user-service';
import { ProductCard } from '../components/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [NgFor, ProductCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
products:any[]=[];
searchText: string = '';
allProducts:any[]=[];
constructor(private userService : UserService, private cd: ChangeDetectorRef){}

ngOnInit(): void{ 
     this.loadProduct();
}


loadProduct() {
  this.userService.getProducts().subscribe({
    next: (res) => {
      console.log("DATA:", res);
      this.products = res;
      this.allProducts = res;
      this.cd.detectChanges();
    },
    error: (err) => {
      console.log("API ERROR:", err);
    }
  });
}
get filteredProducts(){
  if(!this.products) return[];
  return this.products.filter((p: any) =>
    p.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
 filter(event:any){
  let value = event.target.value;

  if(value == "low"){
    this.products = [...this.allProducts].sort((a,b)=>a.price - b.price);
  }

  if(value == "high"){
    this.products = [...this.allProducts].sort((a,b)=>b.price - a.price);
  }
}
}
