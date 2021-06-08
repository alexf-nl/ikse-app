import { EventEmitter, Injectable } from '@angular/core';

import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  private products: Product[] = [];
 //private products: Product[] = [
   //new Product(1, 'Playstation 5', 'Dit is een gave playstation 5!', 'eenrandomimage.png', 35.99),
  //new Product(2, 'Playstation 4', 'Dit is een gave playstation 4!', 'eenrandomimage.png', 35.99),
  //];

  constructor(private http: HttpClient) {}
 /* getProducts() {
    return this.products.slice();
  }
*/



  getProducts() {
    this.http
    .get<{message: string, products: any}>(
      'http://localhost:3000/api/products'
    )
    .pipe(map((productenData) => {
      return productenData.products.map(product => {
        return {
          naam: product.naam,
          description: product.description,
          imagePath: product.imagePath,
          price: product.price,
          id: product._id
        }
      })
    }))
    .subscribe((transformedProducts) => {
      console.log(transformedProducts);
      this.products = transformedProducts;
      return this.products.slice();
    });
  }



  getProduct(index: number) {
      return this.products[index];
      console.log(this.products);
  }

  addProduct(naam:string, description:string, imagePath:string, price:number) {
    const product: Product = {naam: naam, description: description, imagePath: imagePath, price: price};
    this.http.post<{message: string}>('http://localhost:3000/api/products/new', product)
    .subscribe((responseData) => {
      console.log(responseData);
    });
    this.products.push(product);
    
  }


}
