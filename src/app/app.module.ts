import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { AddCommerceComponent } from './components/commerces/add-commerce/add-commerce.component';
import { CommercesListComponent } from './components/commerces/commerces-list/commerces-list.component';
import { EditCommerceComponent } from './components/commerces/edit-commerce/edit-commerce.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { AddVilleComponent } from './components/villes/add-ville/add-ville.component';
import { EditVilleComponent } from './components/villes/edit-ville/edit-ville.component';
import { VillesListComponent } from './components/villes/villes-list/villes-list.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ExpirationDateComponent } from './components/expiration-date/expiration-date.component';
import { DetailsComponent } from './components/details/details.component';
import { AddDetailComponent } from './components/details/add-detail/add-detail.component';
import { EditDetailComponent } from './components/details/edit-detail/edit-detail.component';
import { DetailsListComponent } from './components/details/details-list/details-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoriesListComponent,
    AddCommerceComponent,
    CommercesListComponent,
    EditCommerceComponent,
    LoginComponent,
    AddProductComponent,
    EditProductComponent,
    ProductsListComponent,
    AddVilleComponent,
    EditVilleComponent,
    VillesListComponent,
    ExpirationDateComponent,
    DetailsComponent,
    AddDetailComponent,
    EditDetailComponent,
    DetailsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
