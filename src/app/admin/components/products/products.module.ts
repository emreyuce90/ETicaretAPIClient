import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateProductComponent } from './create-product/create-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ListProductComponent } from './list-product/list-product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component: ProductsComponent}
    ]),MatSidenavModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,MatPaginatorModule
  ]
})
export class ProductsModule { }
