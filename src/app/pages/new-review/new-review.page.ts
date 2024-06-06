import {AfterViewInit, Component} from '@angular/core';
import {DataService} from "../../services/data.service"
import {Restaurant} from "../../objects/restaurant"
import {AuthService} from "../../services/auth.service"
import {LoadingController} from "@ionic/angular"
import {Location} from "@angular/common"

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.page.html',
  styleUrls: ['./new-review.page.scss'],
})
export class NewReviewPage implements AfterViewInit {
  restaurant?: Restaurant

  reviewText = ''
  rating = 0

  images: { b64: string, file: File }[] = []


  constructor(
    private data: DataService,
    private auth: AuthService,
    private loadingController: LoadingController,
    private location: Location,
  ) {
    this.restaurant = this.data.selectedRestaurant
  }

  updateRating(rating: number) {
    this.rating = rating
  }

  async addReview() {
    const loading = await this.loadingController.create()
    await loading.present()

    // @ts-ignore
    const review_id = (await this.data.addReview(
      this.restaurant?.id!,
      this.auth.getCurrentUserId()!,
      this.rating,
      this.reviewText
    ))["data"][0].id

    await this.data.uploadRestaurantImages(this.restaurant?.id!, review_id, this.images)

    await loading.dismiss()

    this.location.back()
  }

  ngAfterViewInit() {
    const fileInput: HTMLInputElement = document.getElementById("file-input") as HTMLInputElement

    document.getElementById("image-selection")!.addEventListener("click", () => {
      fileInput.click()
    })

    fileInput.addEventListener("change", async () => {
      let reader = new FileReader()

      if(fileInput.files != null) {
        reader.onload = (e) => {
          this.images.push({
            b64: e.target!.result as string,
            file: fileInput.files!.item(0)!
          })
        }
        reader.readAsDataURL(fileInput.files.item(0)!)
      }
    })

    console.log(this.images)
  }
}
