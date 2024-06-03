import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service"
import {DataService} from "../../services/data.service"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements AfterViewInit {
  name = ''
  email = ''
  profile_picture: string|null = null

  constructor(
    private auth: AuthService,
    private data: DataService,
  ) {
    this.auth.getCurrentUser().subscribe((user) => {
      if(user) {
        this.name = user.user_metadata['name']
        this.email = user.email ?? ''
      }
    })
  }

  signOut() {
    this.auth.signOut()
  }

  async ngAfterViewInit() {
    const fileInput: HTMLInputElement = document.getElementById("file-input") as HTMLInputElement

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
    this.profile_picture = (await this.data.getSignedProfilePictureURL(this.auth.getCurrentUserId()!))!
  }
}
