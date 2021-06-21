import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: string;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private router: Router, 
              private shoppingCartService: ShoppingCartService, private http: HttpClient) {
              }

  ngOnInit(): void {
    this.route.params.subscribe(
        (params: Params) => {
          //this.product = this.productService.getProduct(params.id);
    }   
  );
  }

  
  public onAddToCart() {
    this.shoppingCartService.add(this.product);
  }

  public onDelete(id: string) {
    this.http.delete("http://localhost:3000/api/products/delete/" + id)
    .subscribe(() => {
      this.router.navigate(['/products'])

    });
  }

}
