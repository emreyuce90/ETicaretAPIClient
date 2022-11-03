import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserCreate } from 'src/app/contracts/user_create';
import { User } from 'src/app/entity/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClientservice: HttpClientService) { }

  async createUser(user: User): Promise<UserCreate> {
    const data: Observable<User | UserCreate> = this._httpClientservice.post<User | UserCreate>({
      controller: "users",
    }, user);
    return await firstValueFrom(data) as UserCreate;
  }

  async login(username: string, password: string,successCalback?:()=>void):Promise<void>{
   const response:Observable<any>= this._httpClientservice.post({
      controller: "users",
      action: "login"
    },{ username, password })
    await firstValueFrom(response);
  }
}


