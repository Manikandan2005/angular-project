import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  formdata={name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;
  name="";

  constructor(private http:HttpClient,private auth:AuthService,private router:Router) { }

  ngOnInit(){
  }

  onSubmit()
  {
    this.loading=true;

    this.auth.login(this.formdata.email,this.formdata.password).subscribe({
      next:data=>{
        /*this.auth.storeToken(data.idToken);*/
        this.router.navigate(['/home']);
    },
    error:data=>{
      if(data.error.error.message=="INVALID_EMAIL"){
        this.errorMessage="Invalid Email !"
      }
      else if(data.error.error.message=="INVALID_PASSWORD"){
        this.errorMessage="Invalid password";
      }
      else{
        this.errorMessage=("Unknown error");
      }

    }
  }).add(()=>{
    this.loading=false;
    console.log("user found");
  })
  }
  
}
