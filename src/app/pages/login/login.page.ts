import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service"
import {Router} from "@angular/router"
import {FormBuilder, Validators} from "@angular/forms"
import {AlertController, LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log("USER ON LOGIN PAGE: ", user)
        this.router.navigateByUrl("/home", {replaceUrl: true})
      }
    })
  }

  get email() {
    return this.credentials.controls.email
  }

  get password() {
    return this.credentials.controls.password
  }

  async signIn() {
    const loading = await this.loadingController.create()
    await loading.present()

    await this.auth.signIn(this.credentials.getRawValue()).then(async (data) => {
      await loading.dismiss()
      if (data.error) {
        await this.showAlert('Falha ao iniciar sessão', data.error.message)
      }
    })
  }

  async showAlert(header: string, message: string) {
    await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })
  }
}
