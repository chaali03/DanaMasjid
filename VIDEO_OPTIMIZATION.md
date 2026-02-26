# Video Optimization Guide

## Current Issue

Videos are too large for web delivery:
- `login.mp4`: 65.89 MB ❌
- `register.mp4`: 40.47 MB ❌
- `vidio1.mp4`: 17.44 MB ⚠️

**Target**: < 5 MB per video for optimal web performance

## Quick Fix

### Option 1: Compress Videos (Recommended)

1. **Install ffmpeg** (if not already installed):
   ```bash
   # Windows (using Chocolatey)
   choco install ffmpeg
   
   # Mac (using Homebrew)
   brew install ffmpeg
   
   # Linux (Ubuntu/Debian)
   sudo apt-get install ffmpeg
   ```

2. **Run compression script**:
   ```bash
   # High quality, smaller size (recommended)
   npm run compress:videos
   
   # Medium quality, balanced
   npm run compress:videos:balanced
   
   # Low quality, smallest size
   npm run compress:videos:small
   ```

3. **Review compressed videos** in `public/vidio/compressed/`

4. **Replace original files** if quality is acceptable

### Option 2: Manual Compression

Use online tools:
- https://www.freeconvert.com/video-compressor
- https://www.videosmaller.com/
- https://clideo.com/compress-video

Target settings:
- Resolution: 1920x1080 (or lower for mobile)
- Bitrate: 2-3 Mbps
- Format: MP4 (H.264)
- Audio: AAC 128kbps

### Option 3: Use External CDN

Upload videos to:
- **Cloudinary** (free tier: 25GB storage, 25GB bandwidth/month)
- **Bunny CDN** (pay-as-you-go, very cheap)
- **AWS S3 + CloudFront**

Then update video URLs in your components.

## Optimization Techniques Applied

### 1. Lazy Loading
- Changed `preload="auto"` to `preload="metadata"`
- Only loads video metadata initially, not full video
- Reduces initial page load time

### 2. Poster Images
- Added `poster` attribute support
- Shows thumbnail while video loads
- Create poster images:
  ```bash
  ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 poster.jpg
  ```

### 3. Loading Indicator
- Shows spinner while video loads
- Better user experience
- Prevents blank screen

### 4. Compression Settings
The script uses these ffmpeg settings:

**Web Preset (Recommended)**:
```bash
-c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart
```
- CRF 28: Good quality, smaller size
- Preset slow: Better compression
- faststart: Enables progressive download

**Expected Results**:
- 60-80% file size reduction
- Minimal quality loss
- Faster loading times

## Best Practices

### Video Specifications for Web:

1. **Resolution**:
   - Desktop: 1920x1080 (Full HD)
   - Mobile: 1280x720 (HD)
   - Consider using responsive videos

2. **Duration**:
   - Keep videos short (< 30 seconds)
   - Loop short clips instead of long videos

3. **File Size**:
   - Target: < 5 MB per video
   - Maximum: 10 MB
   - Anything larger should use streaming

4. **Format**:
   - Primary: MP4 (H.264)
   - Fallback: WebM (VP9) for better compression
   - Use multiple formats for browser compatibility

5. **Optimization**:
   - Use CRF 23-28 for web
   - Enable faststart flag
   - Compress audio to 128kbps AAC

## Advanced: Multiple Quality Versions

Create different versions for different devices:

```bash
# Desktop (1080p)
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 desktop.mp4

# Tablet (720p)
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 25 tablet.mp4

# Mobile (480p)
ffmpeg -i input.mp4 -vf scale=854:480 -c:v libx264 -crf 28 mobile.mp4
```

Then use responsive video loading in your component.

## Monitoring

After optimization, check:
- Lighthouse Performance score
- Network tab in DevTools
- Time to First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

## Troubleshooting

### Video not playing after compression
- Check codec compatibility (use H.264)
- Ensure faststart flag is enabled
- Test in multiple browsers

### Quality too low
- Reduce CRF value (lower = better quality)
- Use 'balanced' or 'web' preset
- Increase bitrate

### File still too large
- Reduce resolution
- Increase CRF value
- Reduce frame rate to 24fps
- Trim video duration

## Resources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Web Video Best Practices](https://web.dev/fast/#optimize-your-videos)
- [Video Compression Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
