import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductNewComponent } from './products/product-new/product-new.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthAdminGuard } from './auth/auth-admin.guard';


const appRoutes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full' },
  {path: 'products', component: ProductsComponent},
  {path: 'products/get', component: ProductDetailComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin/products/new', component: ProductNewComponent, canActivate: [AuthGuard]},
  {path: 'admin/products/edit', component: ProductNewComponent, canActivate: [AuthGuard]}, //we hergebruiken productnew component



];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
