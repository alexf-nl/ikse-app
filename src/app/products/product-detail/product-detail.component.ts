import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
const BACKEND_URL = environment.apiUrl + "/products/";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: string;
  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs: Subscription;
  private subscription: Subscription;

  constructor(private productService: ProductService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router, 
              private shoppingCartService: ShoppingCartService, private http: HttpClient) {
              }

  ngOnInit(): void {
    this.userIsAdmin = this.authService.getAdmin();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
    });

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
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
    this.http.delete(BACKEND_URL + "delete/" + id)
    .subscribe(() => {
      this.router.navigate(['/products'])

    });
  }

  ngOnDestroy() : void {
    this.authListenerSubs.unsubscribe();
  }

}
