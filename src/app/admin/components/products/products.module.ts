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
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { EditDirective } from 'src/app/directives/admin/edit.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from '../../../common/file-upload/file-upload.module';
import { UploadDialogComponent } from '../../../dialogs/upload-dialog/upload-dialog.component';
import { ImageUploadComponent } from '../../../dialogs/image-upload/image-upload.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListProductComponent,
    DeleteDirective,
    EditDirective,
    DeleteDialogComponent,
    UploadDialogComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component: ProductsComponent}
    ]), MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatDialogModule, FileUploadModule
  ]
})
export class ProductsModule { }
