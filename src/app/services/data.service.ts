import {Injectable} from "@angular/core"
import {createClient, SupabaseClient} from "@supabase/supabase-js"
import {environment} from "../../environments/environment"
import {Restaurant} from "../objects/restaurant"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
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


}
