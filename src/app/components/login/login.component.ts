import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if ( auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(res => {
      this.toast.success('You are now logged in', 'SUCCESS');
    }).catch(err => {
      console.log(err);
      this.toast.error('Sorry, login failed', 'Unsuccessful');
    });
  }

}

