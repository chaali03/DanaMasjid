/**
 * Custom image loader for Netlify
 * Uses Netlify's image CDN for optimization
 */
export default function netlifyImageLoader({ src, width, quality }) {
  // For external URLs, return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  // For local images, use Netlify Image CDN
  const params = new URLSearchParams()
  params.set('url', src)
  params.set('w', width.toString())
  params.set('q', (quality || 75).toString())

  return `/.netlify/images?${params.toString()}`
}
