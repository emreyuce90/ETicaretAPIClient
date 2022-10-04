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
import { ProductService } from '../../common/models/product.service';
import { DeleteDialogComponent, DialogContent } from '../../dialogs/delete-dialog/delete-dialog.component';
declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective extends BaseComponent {
  constructor(
    public dialog: MatDialog,
    spinner:NgxSpinnerService, 
    private _render: Renderer2,
    private element: ElementRef,
    private _productService: ProductService,
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
      await this._productService.delete(this.id);
      //Silme işleminden sonra tr yi jquery ile hide edelim ve tablomuzu yenileyelim
      const td = this.element.nativeElement;
      $(td.parentElement).fadeOut(500, () => this.callback.emit());
    });
    
  }

  openDialog(callBack:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DialogContent.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DialogContent.Yes)
        callBack();
    });
  }
}
