import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role:string='';
  email : string = '';
  password : string = '';
  roles:string[];
  constructor(private auth : AuthService) { 
    this.roles=['admin','user']
  }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Hãy nhập email');
      return;
    }
    if(this.role == '') {
      alert('Hãy chọn vị trí');
      return;
    }

    if(this.password == '') {
      alert('Hãy nhập mật khẩu');
      return;
    }

    this.auth.login(this.email,this.password,this.role);
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 
}