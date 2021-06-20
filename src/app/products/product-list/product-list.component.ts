import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  subscription: Subscription;
  private productsObservable : Observable<any[]> ; 


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    try{
    this.products = this.productService.getProducts();
    }catch(error) {
      console.log(error);
    }
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id);
  }




  

}
