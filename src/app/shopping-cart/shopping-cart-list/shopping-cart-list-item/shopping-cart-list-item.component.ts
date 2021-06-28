import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.css']
})
export class ShoppingCartListItemComponent implements OnInit {
  @Input() public product: Product;
  @Input() public index: number;
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>(); 
  constructor() { }

  ngOnInit(): void {
  }

    public removeFromCart() { 
      this.remove.emit(this.index);
    }
}
