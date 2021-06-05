import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public products: Product[] = [];
  private subscription: Subscription;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this.shoppingCartService.getAll();
    
    this.subscription = this.shoppingCartService.productsInCartChanged
    .subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public removeProductFromCart(index: number) {
    this.shoppingCartService.delete(index);
  }

}
