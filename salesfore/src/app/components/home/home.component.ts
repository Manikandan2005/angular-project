import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  message="Welcome ";

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAcess();
    this.auth.login
  }

}
