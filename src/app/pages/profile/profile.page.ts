import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  name = ''
  email = ''

  constructor(
    private auth: AuthService
  ) {
    this.auth.getCurrentUser().subscribe((user) => {
      this.name = user.user_metadata['name']
      this.email = user.email ?? ''
    })
  }

  signOut() {
    this.auth.signOut()
  }

}
