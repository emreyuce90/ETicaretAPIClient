import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { HttpClientService } from '../../common/http-client.service';
import { DeleteDialogComponent, DialogDeleteContent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessagePosition, MessageType } from '../../services/admin/alertify.service';
import { ToastrNotificationService } from '../../services/ui/toastr-notification.service';
declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective extends BaseComponent {
  constructor(
    private _alertifyService: AlertifyService,
    public dialog: MatDialog,
    spinner: NgxSpinnerService,
    private _render: Renderer2,
    private element: ElementRef,
    private _httpClientService: HttpClientService
  ) {
    super(spinner)
    //Bir tane image etiketi oluşturduk bu image e path verdik
    //Üzerine gelindiğinde mouse un pointer olmasını söyledik
    //bu image e genişlik ve yükseklik bildirdik
    //yazıldığı elemente eklenmesi gerektiğini bildirdik
    const img = _render.createElement('img');
    img.setAttribute('src', 'assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 25;
    img.height = 25;
    _render.appendChild(element.nativeElement, img);
  }

  @Input() controllerName: string;
  //Tabloyu yenileyebilmek için yani list operasyonunu tetikleyebilmek için bir output eventemitter oluşturmamız gerekir
  @Output() callback: EventEmitter<any> = new EventEmitter();

  //Html tarafında [id]="element.id" yazarak bu id yi aşağıdaki id propertysine atadık Input sayesinde
  @Input() id: string;
  //Silme operasyonunu başlatabilmek için click eventini  HostListener ile yakalayalım
  @HostListener('click')
  async onclick() {
    this.openDialog(async () => {
      this.showSpinner(SpinnerType.BallTrianglePath);
      //Input propertysinden gelen değeri productService operasyonuyla silelim
      await this._httpClientService.delete(
        {
          controller: this.controllerName

        }, this.id).subscribe(d => {
          //Silme işleminden sonra tr yi jquery ile hide edelim ve tablomuzu yenileyelim
          const td = this.element.nativeElement;
          $(td.parentElement).fadeOut(500, () => this.callback.emit());
          this._alertifyService.message("Silme işlemi başarılı", { position: MessagePosition.ÜstSağ, messageType: MessageType.Success })
        }, (errorResponse: HttpErrorResponse) => {
          this._alertifyService.message("Silme işlemi başarısız", { position: MessagePosition.ÜstSağ, messageType: MessageType.Error })
        })

    });

  }

  openDialog(callBack: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DialogDeleteContent.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DialogDeleteContent.Yes)
        callBack();
    });
  }
}
