import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {


  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    
  }
  isLoading = false;


  onNewProduct(form: NgForm) {
    console.log(form.value);    
    console.log('ja');
    this.productService.addProduct(new Product(form.value.naam, form.value.description, form.value.imagePath, form.value.price));
  }
  
  

}
