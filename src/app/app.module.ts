import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { EditDirective } from './directives/admin/edit.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { UploadDialogComponent } from './dialogs/upload-dialog/upload-dialog.component';
import { ImageUploadComponent } from './dialogs/image-upload/image-upload.component';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7021"]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7021/api", multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
