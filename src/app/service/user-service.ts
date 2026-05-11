import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/user-model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl ='https://pearl-pine-backend.onrender.com/api/User';
  constructor(private http : HttpClient){}

  signupService(data : UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>(this.apiUrl +'/Signup',data);
}

loginService(data : UserModel): Observable<UserModel>{
  return this.http.post<UserModel>(this.apiUrl+'/Login',data);
}

getProducts(){
  return this.http.get<any>('https://pearl-pine-backend.onrender.com/api/Product/GetProducts');
}
notifyUser(data:any){
  return this.http.post('https://pearl-pine-backend.onrender.com/api/Notify', data);
}
}
