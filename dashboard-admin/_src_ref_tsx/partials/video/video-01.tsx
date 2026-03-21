import React from 'react';

const PartialsVideoVideo01: React.FC = () => {
  return <div dangerouslySetInnerHTML={{ __html: `<div class="overflow-hidden rounded-lg aspect-video">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="w-full h-full"
  >
  </iframe>
</div>
` }} />;
};

export default PartialsVideoVideo01;
