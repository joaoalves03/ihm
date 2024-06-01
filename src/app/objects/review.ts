export class Review{
  id: number
  created_at: Date
  user: number
  restaurant: number
  rating: number
  text: string

  constructor(id: number, created_at: Date, user: number, restaurant: number, rating: number, text: string) {
    this.id = id
    this.created_at = created_at
    this.user = user
    this.restaurant = restaurant
    this.rating = rating
    this.text = text
  }
}
