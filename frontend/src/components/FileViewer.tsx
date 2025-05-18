import React from 'react';
import { FileIcon } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface File {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: File[];
}

interface FileViewerProps {
  file: File;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const getLanguage = (language?: string) => {
    switch (language) {
      case 'javascript':
        return 'javascript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-900 py-3 px-4 border-b border-slate-800 flex items-center">
        <FileIcon size={16} className="mr-2 text-slate-400" />
        <span className="font-medium">{file.name}</span>
      </div>
      <div className="flex-grow bg-slate-900/80">
        <Editor
          height="100%"
          defaultLanguage={getLanguage(file.language)}
          defaultValue={file.content || ''}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default FileViewer;