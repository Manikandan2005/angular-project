import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  post(name: string, email: string, password: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!=null)
    {
      return true;
    }
    return false;
  }

  canAcess()
  {
    if(!this.isAuthenticated())
    {
      this.router.navigate(['/login']);
    }
  }

  register(name:string,email:string,password:string)
  {
  
    return this.http
    .post<{idToken:string}>('http://192.168.31.211:5000/api/register-user',{displayName:name,email,password})
  }

  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    return this.http.get<{idToken:string}>('http://192.168.31.211:5000/api/read-users')
  }
}
