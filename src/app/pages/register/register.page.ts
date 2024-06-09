import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service"
import {Router} from "@angular/router"
import {FormBuilder, Validators} from "@angular/forms"
import {AlertController, LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials = this.fb.nonNullable.group({
    name: ['', Validators.required],
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
  }

  get name() {
    return this.credentials.controls.name
  }

  get email() {
    return this.credentials.controls.email
  }

  get password() {
    return this.credentials.controls.password
  }

  async signUp() {
    const loading = await this.loadingController.create()
    await loading.present()

    this.auth.signUp(this.credentials.getRawValue()).then(async (data) => {
      await loading.dismiss()

      if (data.error) {
        if(data.error.message == "Password should be at least 6 characters.")
          await this.showAlert('Erro a registar', "Palavra-passe deve conter pelo menos 6 carateres")
        else if (data.error.message == "Unable to validate email address: invalid format")
          await this.showAlert('Erro a registar', "E-mail inválido")

        else await this.showAlert('Erro a registar', data.error.message)
      } else {
        await this.router.navigateByUrl("/register-complete")
      }
    })
  }

  async showAlert(header: string, message: string) {
    await (await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })).present()
  }
}
