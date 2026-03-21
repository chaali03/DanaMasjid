import React from 'react';

const PartialsButtonsButton01: React.FC = () => {
  return <div dangerouslySetInnerHTML={{ __html: `<div class="flex items-center gap-5">
  <button
    class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
  >
    Button Text
  </button>

  <button
    class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
  >
    Button Text
  </button>
</div>
` }} />;
};

export default PartialsButtonsButton01;
