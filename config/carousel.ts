export interface CarouselItem {
  name: string
  url: string
  link: string | null
}

export const carouselItems: CarouselItem[] = [
  {
    name: '2025-12.jpg',
    url: '/pictures/2025-12.jpg',
    link: '/issues/36'
  },
  {
    name: '2025-09.jpg',
    url: '/pictures/2025-09.jpg',
    link: '/issues/33'
  }
]
