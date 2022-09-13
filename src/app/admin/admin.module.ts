import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';


//Admin modülü layout modülünü kullanacağı için onu import eder
//Aynı zamanda layout modülünü export eder ,dışa açar
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    RouterModule
  ],exports:[
    LayoutModule
  ]
})
export class AdminModule { }
