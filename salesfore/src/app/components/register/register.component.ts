import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @Input() data: any

  formdata={name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;
  name="";
  constructor(private router:Router,private auth:AuthService,private http:HttpClient) { }

  ngOnInit() {

  }

  onSubmit()
  {
    this.loading=true;
    this.name=this.formdata.name;
    
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password).subscribe({
      next:data=>{
        /*this.auth.storeToken(data.idToken);*/
        this.router.navigate(['/home']);
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Please enter a valid email";
        }
        else if(data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage="Email already exists";
        }
        else{
          this.errorMessage="unknown error";
        }
      }
    }).add(()=>{
      this.loading=false;
      console.log("register completed");
    })
    }

  }


