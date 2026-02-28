export interface PopularProduct {
  id: string
  name: string
  price: number
  description: string
  image: string
}

export interface Producer {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  deliveryMinutes: number
  address: string
  productIds: string[]
  popularProducts: PopularProduct[]
}
