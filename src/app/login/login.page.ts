import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router"
import {FormBuilder, Validators} from "@angular/forms"
import {AlertController, LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  isToastOpen: boolean = false;

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

  ngOnInit() {
  }

  async signIn() {
    /*this.loading = true
    //const result = await this.auth.signIn(this.email, this.password)
    this.loading = false

    if(result.error) this.setOpen(true)
    else await this.router.navigateByUrl("/home")*/

    const loading = await this.loadingController.create()
    await loading.present()

    await this.auth.signIn(this.credentials.getRawValue()).then(async (data) => {
      await loading.dismiss()
      if (data.error) {
        await this.showAlert('Login failed', data.error.message)
      }
    })
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })
  }

  setOpen(value: boolean) {
    this.isToastOpen = value
  }
}
