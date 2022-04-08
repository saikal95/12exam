import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUserData, RegisterUserData, User} from "../models/user.model";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData){
    const formData = new FormData();
   formData.append('email', userData.email);
   formData.append('password', userData.password);
   formData.append('displayName', userData.displayName);

   if(userData.avatar){
     formData.append('avatar', userData.avatar);
   }

    return this.http.post<User>(env.apiUrl + '/user', formData);
  }


  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/user/sessions', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/user/sessions');
  }



}
