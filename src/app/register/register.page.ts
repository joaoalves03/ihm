import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router"
import {FormBuilder, Validators} from "@angular/forms"
import {AlertController, LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
      console.log('data: ', data)

      if (data.error) {
        await this.showAlert('Erro a registar', data.error.message)
      } else {
        await this.router.navigateByUrl("/register-complete")
      }
    })

    /*this.loading = true
    const result = await this.auth.signUp(
      this.email,
      this.password,
      this.name
    )
    this.loading = false

    if(result.error) this.setOpen(true)
    else await this.router.navigateByUrl("/register-complete")*/
  }

  ngOnInit() {
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })
  }
}
