import { useEffect, RefObject } from 'react'

interface UseVideoReverseOptions {
  duration?: number 
  fps?: number 
}

export function useVideoReverse(
  videoRef: RefObject<HTMLVideoElement>,
  options: UseVideoReverseOptions = {}
) {
  const { duration, fps = 60 } = options

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Enhanced hardware acceleration
    video.style.transform = 'translate3d(0, 0, 0)'
    video.style.backfaceVisibility = 'hidden'
    video.style.perspective = '1000px'
    video.style.willChange = 'transform'
    
    // Optimize video loading and playback
    video.preload = 'auto'
    video.playsInline = true
    video.defaultPlaybackRate = 1.0
    video.loop = false
    
    // Ensure video starts from beginning
    video.currentTime = 0
    
    let isReversing = false
    let animationFrameId: number | null = null
    let videoDuration = duration || 0
    const reverseSpeed = 1 / fps

    // Get actual video duration when metadata is loaded
    const handleLoadedMetadata = () => {
      videoDuration = video.duration
      console.log('✅ Video duration:', videoDuration, 'seconds')
    }

    // Play video immediately when loaded
    const playVideo = () => {
      console.log('▶️ Playing forward from', video.currentTime.toFixed(2))
      video.play().catch(err => console.log('Video autoplay prevented:', err))
    }
    
    if (video.readyState >= 1) {
      handleLoadedMetadata()
    }
    
    if (video.readyState >= 3) {
      playVideo()
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
      video.addEventListener('loadeddata', playVideo, { once: true })
    }

    const reverseVideo = () => {
      if (!isReversing) {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
        return
      }
      
      // Reverse the video smoothly
      const newTime = video.currentTime - reverseSpeed
      
      if (newTime <= 0.05) {
        console.log('🔄 Reverse complete! Restarting forward from 0')
        isReversing = false
        video.currentTime = 0
        
        // Cancel animation frame
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
        
        // Use requestAnimationFrame to ensure smooth transition
        requestAnimationFrame(() => {
          video.play().catch(err => console.log('Play error:', err))
        })
        return
      }
      
      video.currentTime = newTime
      
      // Continue the animation loop
      animationFrameId = requestAnimationFrame(reverseVideo)
    }

    const handleTimeUpdate = () => {
      // Use actual video duration
      const endTime = videoDuration || video.duration
      
      // When video reaches near the end, start reversing
      if (video.currentTime >= endTime - 0.1 && !isReversing && !video.paused) {
        console.log('⏪ Forward complete! Starting reverse from', video.currentTime.toFixed(2))
        isReversing = true
        video.pause()
        
        // Start reverse playback immediately
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
        }
        animationFrameId = requestAnimationFrame(reverseVideo)
      }
    }

    const handleEnded = () => {
      // Fallback: if video ends naturally, start reversing
      if (!isReversing) {
        console.log('⏹️ Video ended event, starting reverse')
        isReversing = true
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
        }
        animationFrameId = requestAnimationFrame(reverseVideo)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [videoRef, duration, fps])
}
