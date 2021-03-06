import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule'},
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },  { path: 'add-product', loadChildren: './add-product/add-product.module#AddProductPageModule' },
  { path: 'uploadphoto', loadChildren: './uploadphoto/uploadphoto.module#UploadphotoPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
