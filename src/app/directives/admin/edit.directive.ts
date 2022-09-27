import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';

@Directive({
  selector: '[appEdit]'
})
export class EditDirective {

  constructor(private _renderer:Renderer2,private httpClientService:HttpClientService,element:ElementRef) {
    const img= _renderer.createElement("img");
    img.setAttribute("src","assets/edit.png");
    img.setAttribute("style","cursor:pointer;")
    img.height=25;
    img.width=25;
    _renderer.appendChild(element.nativeElement,img);
   }



}
