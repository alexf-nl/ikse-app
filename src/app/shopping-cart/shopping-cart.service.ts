import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public productsInCartChanged: Subject<Product[]> = new Subject<Product[]>();

  private productsInCart: Product[] = [
  ];




  constructor() { }

    public add(product: any) {
      
      console.log(this.productsInCart.push(product));
      this.productsInCartChanged.next(this.productsInCart.slice());
    }

    public delete(index: number) {
      if(index > -1) {
        this.productsInCart.splice(index, 1);
      this.productsInCartChanged.next(this.productsInCart.slice());
      }

    }

    public getAll(): Product[] {
      return this.productsInCart.slice();
    }

  }

