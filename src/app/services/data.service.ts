import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Restaurant } from '../objects/restaurant';
import { Review } from '../objects/review';
import { DetailedReview } from '../objects/detailed_review';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;

  public selectedRestaurant?: Restaurant;

  constructor() {
    this.supabase = AuthService.getSupabaseClient();
  }

  async getRestaurants(): Promise<Restaurant[]> {
    let {data} = await this.supabase.from('restaurants').select('*');
    return data as Restaurant[];
  }

  async getRestaurant(id: number): Promise<Restaurant> {
    let {data} = await this.supabase.from('restaurants').select('*').eq('id', id).single();
    return data as Restaurant;
  }

  async findRestaurants(query: string): Promise<Restaurant[]> {
    let {data} = await this.supabase.from('restaurants').select('*').ilike('name', `%${query}%`);
    return data as Restaurant[];
  }

  async getReviews(restaurant_id: number): Promise<Review[]> {
    let {data} = await this.supabase.from('reviews').select('*').eq('restaurant', restaurant_id);
    return data as Review[];
  }

  async getReview(id: number): Promise<DetailedReview> {
    let {data} = await this.supabase.from('detailedreviews').select('*').eq('id', id).single();
    return data as DetailedReview;
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

  async addReview(restaurant: number, user: number, rating: number, text: string) {
    const {data} = await this.supabase
        .from('reviews')
        .insert([{user: user, restaurant: restaurant, rating: rating, text: text}])
        .select();
    // return data as Review[];
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
    const {data} = await this.supabase
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
}
