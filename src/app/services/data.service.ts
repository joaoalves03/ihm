import {Injectable} from "@angular/core"
import {SupabaseClient} from "@supabase/supabase-js"
import {Restaurant} from "../objects/restaurant"
import {Review} from "../objects/review"
import {DetailedReview} from "../objects/detailed_review"
import {AuthService} from "./auth.service"
import {User} from "../objects/user"


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
      .from('restaurantswithrating')
      .select('*')

    return data as Restaurant[]
  }

  async getRestaurant(id: number): Promise<Restaurant> {
    let { data } = await this.supabase
      .from('restaurantswithrating')
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

  async getDetailedReviews(restaurant_id: number): Promise<DetailedReview[]> {
    let { data } = await this.supabase
      .from('detailedreview')
      .select('*')
      .eq('restaurant', restaurant_id)

    return data as DetailedReview[]
  }

  async getReview(id: number): Promise<Review> {
    let{ data } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single()

    return data as Review
  }

  async getDetailedReview(id: number): Promise<DetailedReview> {
    let{ data } = await this.supabase
      .from('detailedreview')
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

  async getUserInfo(userId: string): Promise<User> {
    const {data} = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    return data as User
  }

  async toggleFavorite(user_id: string | null, restaurant_id: number) {
    const {data: existingFavorite} = await this.supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user_id)
      .eq('restaurant_id', restaurant_id)
      .single();

    if (existingFavorite) {
      await this.supabase
        .from('favorites')
        .delete()
        .eq('user_id', user_id)
        .eq('restaurant_id', restaurant_id);
    } else {
      await this.supabase
        .from('favorites')
        .insert([{user_id: user_id, restaurant_id: restaurant_id}]);
    }
  }

  async isFavorite(user_id: string | null, restaurant_id: number) {
    if (user_id) {
      const {data: existingFavorite} = await this.supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user_id)
        .eq('restaurant_id', restaurant_id)
        .single();
      return !!existingFavorite;
    } else {
      return false;
    }
  }

  async deleteFavorite(user_id: string | null, restaurant_id: number) {
    await this.supabase
      .from('favorites')
      .delete()
      .eq('user_id', user_id)
      .eq('restaurant_id', restaurant_id);
  }

  async getFavoriteRestaurants(user_id: string | null) {
    let favoriteRestaurantIds: number[] = [];
    let favoriteRestaurants: Restaurant[] = [];

    // Fetch the favorite restaurant IDs for the given user
    const { data } = await this.supabase
      .from('favorites')
      .select('restaurant_id')
      .eq('user_id', user_id);

    if (data) {
      favoriteRestaurantIds = data.map((favorite: any) => favorite.restaurant_id);
    }

    for (const restaurantId of favoriteRestaurantIds) {
      const restaurant = await this.getRestaurant(restaurantId);
      if (restaurant) {
        favoriteRestaurants.push(restaurant);
      }
    }
    return favoriteRestaurants;
  }

  async updateProfilePicture(file: File, user_id: string) {
    await this.supabase.storage.from("profile_pictures").remove([user_id])

    await this.supabase.storage
      .from("profile_pictures")
      .upload(user_id, file)
  }

  getProfilePictureURL(user_id: string) {
    return this.supabase.storage.from("profile_pictures").getPublicUrl(user_id).data.publicUrl
  }

  async getSignedProfilePictureURL(user_id: string) {
    return (await this.supabase.storage.from("profile_pictures").createSignedUrl(user_id, 60)).data?.signedUrl
  }

  async updateUser(name?: string, email?: string, password?: string) {

  }
}
