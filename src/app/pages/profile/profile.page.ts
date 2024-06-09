import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service"
import {DataService} from "../../services/data.service"
import {LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewInit {
  name_placeholder = ''
  email_placeholder = ''

  name = ''
  email = ''
  password = ''
  profile_picture: string|null = null

  constructor(
    private auth: AuthService,
    private data: DataService,
    private loadingController: LoadingController,
  ) {
    this.auth.getCurrentUser().subscribe((user) => {
      if(user) {
        this.name_placeholder = user.user_metadata['name']
        this.email_placeholder = user.email ?? ''
      }
    })
  }

  signOut() {
    this.auth.signOut()
  }

  async ngAfterViewInit() {
    const fileInput: HTMLInputElement = document.getElementById("profile-file-input") as HTMLInputElement

    document.getElementById("profile-picture")!.addEventListener("click", () => {
      fileInput.click()
    })

    fileInput.addEventListener("change", async () => {
      if (fileInput.files!.length > 0) {
        this.profile_picture = null
        await this.data.updateProfilePicture(fileInput.files!.item(0)!, this.auth.getCurrentUserId()!)
        await this.refreshProfilePicture()
      }
    })

    await this.refreshProfilePicture()
  }

  async refreshProfilePicture() {
    const data = await this.data.getSignedProfilePictureURL(this.auth.getCurrentUserId()!)
    this.profile_picture = data ?? 'assets/default.jpg'
  }

  async updateUser() {
    if(this.name.length == 0 && this.email.length == 0 && this.password.length == 0)
      return

    const loading = await this.loadingController.create()
    await loading.present()

    await this.data.updateUser(this.name, this.email, this.password)

    await loading.dismiss()
    this.name_placeholder = this.name.length > 0 ? this.name : this.name_placeholder
    this.email_placeholder = this.email.length > 0 ? this.email : this.email_placeholder
    this.name = ""
    this.email = ""
  }
}
