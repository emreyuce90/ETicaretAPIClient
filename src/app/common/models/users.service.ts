import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token';
import { TokenResponse } from 'src/app/contracts/tokenResponse';
import { UserCreateResponse } from 'src/app/contracts/userCreateResponse';
import { UserCreate } from 'src/app/contracts/user_create';
import { User } from 'src/app/entity/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private _httpClientservice: HttpClientService,
    private toastrService: ToastrService
  ) {}

  async createUser(user: User): Promise<UserCreate> {
    const data: Observable<User | UserCreate> = this._httpClientservice.post<User | UserCreate
    >({controller: 'users',},user);
    return (await firstValueFrom(data)) as UserCreate;
  }

  async login(username: string,password: string,successCalback?: () => void): Promise<void> {
    const response: Observable<any | TokenResponse> =
      this._httpClientservice.post<any | TokenResponse>(
        {
          controller: 'users',
          action: 'login',
        },
        { username, password }
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(response)) as TokenResponse;
    if (tokenResponse)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
    this.toastrService.success(
      'Kullanıcı doğrulama başarılı',
      'İşlem Başarılı',
      {
        progressBar: true,
      }
    );
    successCalback();
  }
}
