import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ''
  password: string = ''

  loading: boolean = false;
  isToastOpen: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  async signIn() {
    this.loading = true
    const result = await this.auth.signIn(this.email, this.password)
    this.loading = false

    if(result.error) this.setOpen(true)
    else await this.router.navigateByUrl("/home")
  }

  setOpen(value: boolean) {
    this.isToastOpen = value
  }
}
