export interface Restaurant {
  id: number
  name: string
  street: string
  location: string
  accessibility: string[]
  schedule: (string|null)[],
  avg: number|null
}
