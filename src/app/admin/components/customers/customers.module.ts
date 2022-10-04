import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:CustomersComponent}
    ]), MatSidenavModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatTableModule,MatPaginatorModule
    
  ]
})
export class CustomersModule { }
