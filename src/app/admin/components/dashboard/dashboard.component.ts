import { Component, OnInit } from '@angular/core';
import { AlertifyOptions, AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {

  }
  m() {

    this.alertify.message("Hello World",{delay:3,messageType:MessageType.Error,position:MessagePosition.ÜstSol});
  }
}
