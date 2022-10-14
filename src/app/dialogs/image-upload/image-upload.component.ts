import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../common/file-upload/file-upload.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {
    console.log(this.data);
  }


  close(): void {
    this.dialogRef.close();
  }


  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    controllerName: "products",
    isAdmin: true,
    actionName: "upload",
    queryString:`id=${this.data.productId}`
  };



}

export enum DialogContent {
  Close
}
