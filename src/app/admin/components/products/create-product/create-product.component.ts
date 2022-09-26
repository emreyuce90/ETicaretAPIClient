import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/common/models/product.service';
import { ProductCreateModel } from 'src/app/contracts/ProductCreateModel';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService,spinner: NgxSpinnerService, private alertifyService:AlertifyService) {
    super(spinner)
   }

  ngOnInit(): void {
  }

  @Output() createdProduct :EventEmitter<ProductCreateModel> = new EventEmitter();

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    //yükleniyor görselini aktif et
    this.showSpinner(SpinnerType.BallTrianglePath);
    //api ye göndereceğimiz modelin  nesnesini oluşturduk
    //formdan gelen verileri bu modele yükledik
    const createProduct: ProductCreateModel = new ProductCreateModel();
    createProduct.name = name.value;
    createProduct.price = parseFloat(price.value);
    createProduct.stock = parseInt(stock.value);
   //post işlemi neticesinde bir callback fonksiyonu oluştur
    this.productService.create(createProduct,()=>{
      this.hideSpinner(SpinnerType.BallTrianglePath)
      this.alertifyService.message("Ürün ekleme başarılı!",{messageType:MessageType.Success,position:MessagePosition.ÜstSağ})
    });
    this.createdProduct.emit(createProduct);
  }


  
}
