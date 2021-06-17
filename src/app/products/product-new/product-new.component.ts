import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      naam: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      imagePath: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      price: new FormControl(null, { validators: [Validators.required] }),

    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; //file die de user selecteert
    this.form.patchValue({imagePath: file});
    this.form.get('imagePath').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }


  onNewProduct() {

    console.log(this.form.value);    
    console.log('ja');
    this.productService.addProduct(this.form.value.naam, this.form.value.description, this.form.value.imagePath, this.form.value.price);
    this.form.reset();
  }
  
  

}
