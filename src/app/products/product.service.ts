import { EventEmitter, Injectable } from '@angular/core';

import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/products/";


@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
 

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(): Product[] {
    this.products.length = 0;
    this.http.get(BACKEND_URL).subscribe(response => {
      response['products'].forEach((product) => {
        this.products.push(new Product(product.naam, product.description, product.imagePath, product.price, product._id));
      })
    })
    return this.products;
  }



  getProduct(id: string) {
    return this.http.get<{ _id: string, naam: string, description: string, imagePath: string, price: string}>(
      BACKEND_URL + id
      
    );
      //return this.products.find(x => 'x.id === id');
  }






  addProduct(naam: string, description: string, imagePath: File, price: string) {
    const productData = new FormData();
    productData.append("naam", naam);
    productData.append("description", description);
    productData.append("imagePath", imagePath, naam);
    productData.append("price", price);
    this.http
      .post<{message: string, product: Product}>(BACKEND_URL+'new', productData)
    .subscribe(responseData => {
      const product: Product = 
      {
        naam: naam, description: description, imagePath: responseData.product.imagePath, price: price, id: responseData.product.id
      } 
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
      this.router.navigate(['/']);
    });
  }

  deleteProduct(id: string) {
    this.http.delete(BACKEND_URL + 'delete/' + 'id')
    .subscribe(() => {
      const updatedProducts = this.products.filter(product => product.id !== 'id');
      this.products = updatedProducts;
    });

  }


  updateProduct(id: string, naam: string, description: string, imagePath: File, price: string) {
    let productData: Product | FormData;
    if (typeof imagePath === "object") {
      productData = new FormData();
      productData.append("id", id);
      productData.append("naam", naam);
      productData.append("description", description);
      productData.append("imagePath", imagePath, naam);
      productData.append("price", price);

    } 
    this.http
      .put(BACKEND_URL + id, productData)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldPostIndex = updatedProducts.findIndex(p => p.id === id);
        const products: Product = {
          id: id,
          naam: naam,
          description: description,
          imagePath: "",
          price: price
        };
        updatedProducts[oldPostIndex] = products;
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
        this.router.navigate(["/"]);
      });
  }



}


