import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { FileUploadOptions } from '../../common/file-upload/file-upload.component';
import { ProductService } from '../../common/models/product.service';
import { ProductImagesList } from '../../contracts/productImagesList';
import { AlertifyService, MessagePosition, MessageType } from '../../services/admin/alertify.service';
import { DeleteDialogComponent, DialogDeleteContent } from '../delete-dialog/delete-dialog.component';
declare var $: any;
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})


export class ImageUploadComponent implements OnInit {

  constructor(
    private alertifyMessage: AlertifyService,
    private spinner: NgxSpinnerService,
    private _productService: ProductService,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    public dialog: MatDialog,
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
    this.spinner.show(SpinnerType.BallTrianglePath);
    this.productImages = await this._productService.getProductImages(this.data.productId, () => this.spinner.hide(SpinnerType.BallTrianglePath));
  }



  async deleteImage(id: string, event: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DialogDeleteContent.Yes
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result == DialogDeleteContent.Yes) { 
      this.spinner.show(SpinnerType.BallTrianglePath);
      await this._productService.deleteProductImage(this.data.productId, id, () => {
        this.spinner.hide(SpinnerType.BallTrianglePath);
        var card = $(event.srcElement).parent().parent();
        card.fadeOut(500);
        this.alertifyMessage.message("Ürün silme işleminiz başarıyla gerçekleşmiştir", {
          messageType: MessageType.Success,
          position: MessagePosition.ÜstSağ
        })

      })
      }
    })

  }



}

export enum DialogContent {
  Close
}
