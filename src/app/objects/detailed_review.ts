export class DetailedReview {
  id: number
  username: string
  rating: number
  text: string
  created_at: Date

  constructor(id: number, username: string, rating: number, text: string, createdAt: Date) {
    this.id = id
    this.username = username
    this.rating = rating
    this.text = text
    this.created_at = createdAt
  }
}
