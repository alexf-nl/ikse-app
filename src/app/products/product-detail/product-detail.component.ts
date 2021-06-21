import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.productService.getProduct(this.id).subscribe(productData => {
          this.product = {
            id: productData._id,
            naam: productData.naam,
            description: productData.description,
            imagePath: productData.imagePath, 
            price: productData.price
          };
        });
      } 
    });
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
