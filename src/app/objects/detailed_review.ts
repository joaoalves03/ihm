export interface DetailedReview {
  id: number,
  created_at: Date,
  name: string,
  image?: string,
  rating: number,
  text: string,
  restaurant: number
}
