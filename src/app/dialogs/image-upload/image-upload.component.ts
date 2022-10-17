import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../common/file-upload/file-upload.component';
import { ProductService } from '../../common/models/product.service';
import { ProductImagesList } from '../../contracts/productImagesList';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {

  }


  close(): void {
    this.dialogRef.close();
  }


  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    controllerName: "products",
    isAdmin: true,
    actionName: "upload",
    queryString: `id=${this.data.productId}`
  };

  productImages: ProductImagesList[];

  async ngOnInit() {
    this.productImages = await this._productService.getProductImages(this.data.productId);
  }

}

export enum DialogContent {
  Close
}
