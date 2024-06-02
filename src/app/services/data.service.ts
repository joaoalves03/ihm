import {Injectable} from "@angular/core"
import {createClient, SupabaseClient} from "@supabase/supabase-js"
import {environment} from "../../environments/environment"
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
    let { data, error } = await this.supabase
      .from('restaurants')
      .select('*')

    return data as Restaurant[]
  }

  async getRestaurant(id: number): Promise<Restaurant> {
    let { data, error } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single()

    return data as Restaurant
  }

  async getReviews(restaurant_id: number): Promise<Review[]> {
    let { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('restaurant', restaurant_id)

    return data as Review[]
  }
  async getReview(id: number): Promise<DetailedReview> {
    let{data, error } = await this.supabase
      .from('detailedreviews')
      .select('*')
      .eq('id', id)
      .single()

    return data as DetailedReview
  }

  async addReview(restaurant: number, user: number, rating: number, text: string){

    const { data, error } = await this.supabase
      .from('reviews')
      .insert([
        { user: user, restaurant: restaurant, rating: rating, text: text},
      ])
      .select()

  }

  async searchRestaurants(name: string) {
    const { data, error } = await this.supabase
      .from('restaurants')
      .select('*')
      .ilike('name', name);

    if (error) {
      console.error('Erro ao buscar restaurantes:', error);
      return [];
    }
    return data;
  }

}
