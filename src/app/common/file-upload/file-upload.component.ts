import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { UploadDialogComponent, UploadDialogParameters } from '../../dialogs/upload-dialog/upload-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from '../../services/admin/alertify.service';
import { ToastrNotificationService, ToastrOpt } from '../../services/ui/toastr-notification.service';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor
    (
      public dialog: MatDialog,
      private httpclientService: HttpClientService,
      private _toasterService: ToastrNotificationService,
      private _alertifyService: AlertifyService,
      private _spinnerService:NgxSpinnerService
  ) {

  }

  @Input() options: Partial<FileUploadOptions>;
  public files: NgxFileDropEntry[];

  public dropped(files: NgxFileDropEntry[]) {
    this.openDialog(() => {
      this.files = files;

      //formData şeklinde göndermemiz gerekiyor formDatayı newleyelim
      const fileData: FormData = new FormData;
      //drop edilen dosyalar bize NgxFileDrop entry şeklinde geliyor,bunları FileSystemFileEntry tipine dönüştürmeliyiz
      //bu tipe dönüştürdükten sonra dosyanın file ı üzerinden file ın adını blob değerini vs de formDataya append ettik
      for (const dosya of files) {
        (dosya.fileEntry as FileSystemFileEntry).file((_file: File) => { fileData.append(_file.name, _file, dosya.relativePath) });
      }

      this._spinnerService.show(SpinnerType.SpinBall);
      this.httpclientService.post({
        action: this.options.actionName,
        controller: this.options.controllerName,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(d => {
        
        this._spinnerService.hide(SpinnerType.SpinBall);

        const message: string = "Dosya yükleme işlemi başarılı";
        if (this.options.isAdmin) {
          this._alertifyService.message(message, {
            messageType: MessageType.Success,
            position: MessagePosition.ÜstSağ
          })
        } else {
          this._toasterService.showToastrMessage("Başarılı", message, ToastrOpt.Success)
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        this._spinnerService.hide(SpinnerType.SpinBall);

        const message: string = "Dosya yükleme işleminde bir hata meydana geldi";
        if (this.options.isAdmin) {
          this._alertifyService.message(message, {
            messageType: MessageType.Error,
            position: MessagePosition.ÜstSağ
          })
        } else {
          this._toasterService.showToastrMessage("İşlem Başarısız", message, ToastrOpt.Error)
        }
      })
    });

  }


  openDialog(callback: any): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '250px',
      data: UploadDialogParameters.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == UploadDialogParameters.Yes)
        callback();
    });
  }
}

export class FileUploadOptions {
  controllerName?: string;
  actionName?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdmin: boolean = false;
}
