import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;
  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs: Subscription;

  private productsObservable : Observable<any[]> ; 


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

   ngOnInit() {
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


    try{
    this.products = this.productService.getProducts();
    }catch(error) {
      console.log(error);
    }
  }

  onDelete(id: string) {
    this.productService.deleteProduct('id');
  }

  ngOnDestroy() : void {
    this.authListenerSubs.unsubscribe();
  }




  

}
