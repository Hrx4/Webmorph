import React from 'react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';

const PreviewPane: React.FC = () => {
  const { files } = useWebsiteBuilder();
  
  // Find index.html content
  const indexHtml = files
    .find(f => f.name === 'public')
    ?.children?.find(f => f.name === 'index.html')
    ?.content || '';

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-slate-900 py-3 px-4 border-b border-slate-800 flex items-center">
        <span className="font-medium text-white">Preview</span>
      </div>
      <div className="flex-grow">
        <iframe
          srcDoc={indexHtml}
          className="w-full h-full border-0"
          sandbox="allow-scripts"
          title="Preview"
        />
      </div>
    </div>
  );
};

export default PreviewPane;