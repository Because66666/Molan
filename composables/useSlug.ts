import { useRoute } from '#imports'

export function useSlug() {
  const route = useRoute()
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] ?? '' : (route.params.slug ?? '')
  return { slug }
}
