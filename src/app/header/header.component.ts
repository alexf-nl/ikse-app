import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public amountOfProductsInCart: number = 0;
  private subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.amountOfProductsInCart = this.shoppingCartService.getAll().length;
    this.subscription = this.shoppingCartService.productsInCartChanged
    .subscribe((products: Product[])=> {
      this.amountOfProductsInCart = products.length;
    });
  }

  ngOnDestroy() : void {
    this.authListenerSubs.unsubscribe();
  }

}
