import { EventEmitter, Injectable } from '@angular/core';

import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  private products: Product[] = [];
 // private products: Product[] = [
   // new Product(1, 'Playstation 5', 'Dit is een gave playstation 5!', 'eenrandomimage.png', 35.99),
  //  new Product(2, 'Playstation 4', 'Dit is een gave playstation 4!', 'eenrandomimage.png', 35.99),
  // ];

  constructor(private http: HttpClient) {}
 /* getProducts() {
    return this.products.slice();
  }
*/

  getProducts() {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/api/products')
    .subscribe((productenData) => {
      this.products = productenData.products;
    });
  }
  getProduct(index: number) {
      return this.products[index];
  }


}
