import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token';
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
    const data: Observable<User | UserCreate> = this._httpClientservice.post<
      User | UserCreate
    >(
      {
        controller: 'users',
      },
      user
    );
    return (await firstValueFrom(data)) as UserCreate;
  }

  async login(
    username: string,
    password: string,
    successCalback?: () => void
  ): Promise<void> {
    const response: Observable<any | Token> = this._httpClientservice.post<
      any | Token
    >(
      {
        controller: 'users',
        action: 'login',
      },
      { username, password }
    );
    const token: Token = (await firstValueFrom(response)) as Token;
    if (token)
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
