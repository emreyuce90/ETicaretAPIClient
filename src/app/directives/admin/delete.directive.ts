import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Renderer2,
} from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
declare var $: any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private _render: Renderer2,
    private element: ElementRef,
    private httpClientService: HttpClientService
  ) {
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
  /**
   *  Click eventini yakala, clicke tıklandığında tr yi animasyonlu bir şekilde sil
   */
  @HostListener('click')
  onclick() {
    const td = this.element.nativeElement;
    $(td.parentElement).fadeOut(500);
  }
}
