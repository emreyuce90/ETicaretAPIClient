import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','modifiedDate'];
  dataSource = null;
  ngOnInit(): void {
  }

}

