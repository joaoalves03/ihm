import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user = this.auth.getCurrentUser()
  name = 'Utilizador'

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.user.subscribe((user) => {
      if(user) {
        this.name = user.user_metadata['name'] !== undefined
          ? user.user_metadata['name']
          : 'Utilizador'
      }
    })
  }

  signOut() {
    this.auth.signOut()
  }

}
