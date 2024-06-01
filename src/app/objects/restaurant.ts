export class Restaurant {
  id: number
  name: string
  street: string
  location: string
  accessibility: string[]
  schedule: string|null[]

  constructor(id: number, name: string, street: string, location: string, accessibility: string[], schedule: string | null[]) {
    this.id = id
    this.name = name
    this.street = street
    this.location = location
    this.accessibility = accessibility
    this.schedule = schedule
  }
}
