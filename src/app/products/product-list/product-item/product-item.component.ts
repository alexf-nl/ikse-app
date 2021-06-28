import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../../product.model';

@Component({ 
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() index: number;

  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs: Subscription;
  private subscription: Subscription;
  
  constructor(private authService: AuthService) { }


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
  }

  

  ngOnDestroy() : void {
    this.authListenerSubs.unsubscribe();
  }






}
