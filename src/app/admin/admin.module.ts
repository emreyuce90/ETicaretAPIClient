import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsModule } from './components/components.module';


//Admin modülü layout modülünü kullanacağı için onu import eder
//Aynı zamanda layout modülünü export eder ,dışa açar
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule
  ],exports:[
    LayoutModule
  ]
})
export class AdminModule { }
