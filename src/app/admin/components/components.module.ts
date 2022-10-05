import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { RouterModule } from '@angular/router';
import { DeleteDirective } from '../../directives/admin/delete.directive';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CustomersModule,
    OrdersModule,
    DashboardModule,
    ProductsModule,
  ]
})
export class ComponentsModule { }
