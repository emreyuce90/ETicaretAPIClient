import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
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
    private httpclientService: HttpClientService,
    private _toasterService: ToastrNotificationService,
      private _alertifyService:AlertifyService
    ) {

  }
  @Input() options: Partial<FileUploadOptions>;
  public files: NgxFileDropEntry[];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    //formData şeklinde göndermemiz gerekiyor formDatayı newleyelim
    const fileData: FormData = new FormData;
    //drop edilen dosyalar bize NgxFileDrop entry şeklinde geliyor,bunları FileSystemFileEntry tipine dönüştürmeliyiz
    //bu tipe dönüştürdükten sonra dosyanın file ı üzerinden file ın adını blob değerini vs de formDataya append ettik
    for (const dosya of files) {
      (dosya.fileEntry as FileSystemFileEntry).file((_file: File) => { fileData.append(_file.name, _file, dosya.relativePath) });
    }
    this.httpclientService.post({
      action: this.options.actionName,
      controller: this.options.controllerName,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(d => {
      const message:string = "Dosya yükleme işlemi başarılı";
      if (this.options.isAdmin) {
        this._alertifyService.message(message, {
          messageType: MessageType.Success,
          position:MessagePosition.ÜstSağ
        })
      } else {
        this._toasterService.showToastrMessage("Başarılı",message,ToastrOpt.Success)
      }
    }, (httpErrorResponse: HttpErrorResponse) => {
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
