import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Use requestIdleCallback for non-critical observer setup
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting
          
          if (isVisible && (!triggerOnce || !hasTriggered)) {
            setIsIntersecting(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          } else if (!triggerOnce && !isVisible) {
            setIsIntersecting(false)
          }
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(setupObserver)
      return () => cancelIdleCallback(id)
    } else {
      return setupObserver()
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, isIntersecting }
}