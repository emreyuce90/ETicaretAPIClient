import { Injectable } from '@angular/core';
declare var alertify: any
@Injectable({
  providedIn: 'root'
})


export class AlertifyService {

  message(message: string, options :Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    const msg = alertify.set('notifier', 'position', options.position);
    alertify[options.messageType](message);

  }
  constructor() { }
}

export enum MessageType {
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}

export enum MessagePosition {
  ÜstSağ = "top-right",
  ÜstOrta = "top-center",
  ÜstSol = "top-left",
  AltSağ = "bottom-right",
  AltOrta = "bottom-center",
  AltSol = "bottom-left"
}

export class AlertifyOptions {
  messageType: MessageType =MessageType.Success;
  position: MessagePosition=MessagePosition.ÜstSağ;
  delay: number=3;
}



