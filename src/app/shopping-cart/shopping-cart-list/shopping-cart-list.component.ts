import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() public products: Product[] = [];
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
  public totaalBedrag: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.totaalBedrag = 0;
  }

  public onRemoveItemFromList(index: number) {
    this.remove.emit(index);
  }

  public bestellen() {
    this.router.navigate(['/order-created']);
  }

}
