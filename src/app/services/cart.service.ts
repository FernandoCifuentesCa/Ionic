import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  img:string;

}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Pizza de Salami', price: 25000, amount: 0 ,img:"https://i.pinimg.com/originals/1b/9a/a9/1b9aa9f2d25e6df970c18df4c17333dd.jpg"},
    { id: 1, name: 'Pizza Clasica', price: 20000, amount: 0 ,img:"https://i.pinimg.com/originals/1b/9a/a9/1b9aa9f2d25e6df970c18df4c17333dd.jpg"},
    { id: 2, name: 'Gaseosa', price: 5000, amount: 0 ,img:"https://i.pinimg.com/originals/1b/9a/a9/1b9aa9f2d25e6df970c18df4c17333dd.jpg"},
    { id: 3, name: 'ensalada', price: 7000, amount: 0 ,img:"https://i.pinimg.com/originals/1b/9a/a9/1b9aa9f2d25e6df970c18df4c17333dd.jpg"}
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor() {}
 
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}