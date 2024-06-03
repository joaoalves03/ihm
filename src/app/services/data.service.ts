import {Injectable} from "@angular/core"
import {SupabaseClient} from "@supabase/supabase-js"
import {Restaurant} from "../objects/restaurant"
import {Review} from "../objects/review"
import {DetailedReview} from "../objects/detailed_review"
import {AuthService} from "./auth.service"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient

  public selectedRestaurant?: Restaurant

  constructor() {
    this.supabase = AuthService.getSupabaseClient()
  }

  async getRestaurants(): Promise<Restaurant[]> {
    let { data} = await this.supabase
      .from('restaurants')
      .select('*')

    return data as Restaurant[]
  }

  async getRestaurant(id: number): Promise<Restaurant> {
    let { data } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single()

    return data as Restaurant
  }

  async findRestaurants(query: string): Promise<Restaurant[]> {
    let { data } = await this.supabase
      .from('restaurants')
      .select('*')
      .ilike('name', `%${query}%`)

    return data as Restaurant[]
  }

  async getReviews(restaurant_id: number): Promise<Review[]> {
    let { data } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('restaurant', restaurant_id)

    return data as Review[]
  }

  async getReview(id: number): Promise<DetailedReview> {
    let{ data } = await this.supabase
      .from('detailedreviews')
      .select('*')
      .eq('id', id)
      .single()

    return data as DetailedReview
  }

  async addReview(restaurant: number, user: string, rating: number, text: string){
    await this.supabase
      .from('reviews')
      .insert([
        { user: user, restaurant: restaurant, rating: rating, text: text},
      ])
      .select()
  }
}
