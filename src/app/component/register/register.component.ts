import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  fullname:string='';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Hãy điền email');
      return;
    }

    if(this.password == '') {
      alert('Hãy điền mật khẩu');
      return;
    }
    if(this.fullname == '') {
      alert('Hãy điền họ tên');
      return;
    }

    this.auth.register( this.email, this.password);

    this.fullname='';
    this.email = '';
    this.password = '';
  }

}