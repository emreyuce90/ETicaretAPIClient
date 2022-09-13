import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    // /admin isteği geldiğinde Dashboard component tetiklenir
    // /admin/customers isteği geldiğinde customer component ayağa kaldırılır
    path:"admin" ,component:LayoutComponent,children:[
      {path:"",component:DashboardComponent},
      {path:"customers", loadChildren:()=>import("../app/admin/components/customers/customers.module").then(module=>module.CustomersModule)},
      {path:"products", loadChildren:()=>import("../app/admin/components/products/products.module").then(module=>module.ProductsModule)},
      {path:"orders", loadChildren:()=>import("../app/admin/components/orders/orders.module").then(module=>module.OrdersModule)}
    ]
  },
  //Sayfaya direkt istek geldiğinde burası çalışır
  // /basket geldiğinde basket component
  {path:"",component:HomeComponent},
  {path:"basket",loadChildren:()=>import("../app/ui/components/basket/basket.module").then(module=>module.BasketModule)},
  {path:"products",loadChildren:()=>import("../app/ui/components/products/products.module").then(module=>module.ProductsModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
