import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  private product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private id: string;
  
  constructor(public productService: ProductService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.productService.getProduct(this.id).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            naam: productData.naam,
            description: productData.description,
            imagePath: productData.imagePath, 
            price: productData.price
          };
          this.form.setValue({
            naam: this.product.naam,
            description: this.product.description,
            imagePath: this.product.imagePath,
            price: this.product.price
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;

      }
    });
    
    this.form = new FormGroup({
      naam: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      imagePath: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      price: new FormControl(null, { validators: [Validators.required,  Validators.minLength(1)] }),

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
    if(this.mode == 'create') {
    console.log('ja');
    this.productService.addProduct(this.form.value.naam, this.form.value.description, this.form.value.imagePath, this.form.value.price);
  } else {
    this.productService.updateProduct(this.form.value.id, this.form.value.naam, this.form.value.description, this.form.value.imagePath, this.form.value.price);

  }
  this.form.reset();

  }
}
