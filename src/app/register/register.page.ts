import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = ''
  email: string = ''
  password: string = ''

  loading: boolean = false
  isToastOpen: boolean = false

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  async signUp() {
    this.loading = true
    const result = await this.auth.signUp(
      this.email,
      this.password,
      this.name
    )
    this.loading = false

    if(result.error) this.setOpen(true)
    else await this.router.navigateByUrl("/home")
  }

  setOpen(value: boolean) {
    this.isToastOpen = value
  }

  ngOnInit() {
  }

}
