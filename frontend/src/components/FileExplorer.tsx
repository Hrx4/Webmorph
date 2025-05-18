import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileIcon, FolderIcon } from 'lucide-react';
import FileViewer from './FileViewer';

interface File {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: File[];
}

interface FileExplorerProps {
  files: File[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '1': true, // Expand src folder by default
    '6': true, // Expand public folder by default
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderFileTree = (items: File[], level = 0) => {
    return items.map(item => {
      const isExpanded = expandedFolders[item.id];
      const paddingLeft = `${level * 16 + 12}px`;

      if (item.type === 'folder') {
        return (
          <React.Fragment key={item.id}>
            <div 
              className="flex items-center py-2 px-3 hover:bg-slate-800/50 cursor-pointer rounded-md transition-colors"
              style={{ paddingLeft }}
              onClick={() => toggleFolder(item.id)}
            >
              {isExpanded ? <ChevronDown size={16} className="mr-2 text-slate-400" /> : <ChevronRight size={16} className="mr-2 text-slate-400" />}
              <FolderIcon size={16} className="mr-2 text-yellow-400" />
              <span>{item.name}</span>
            </div>
            {isExpanded && item.children && (
              <div>{renderFileTree(item.children, level + 1)}</div>
            )}
          </React.Fragment>
        );
      } else {
        return (
          <div 
            key={item.id}
            className={`flex items-center py-2 px-3 hover:bg-slate-800/50 cursor-pointer rounded-md transition-colors ${
              selectedFile?.id === item.id ? 'bg-slate-800' : ''
            }`}
            style={{ paddingLeft }}
            onClick={() => setSelectedFile(item)}
          >
            <FileIcon size={16} className="mr-2 text-slate-400" />
            <span>{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-180px)]">
      <div className="w-64 bg-slate-900/50 rounded-lg overflow-y-auto p-2 border border-slate-800">
        {renderFileTree(files)}
      </div>
      <div className="flex-grow ml-4 rounded-lg overflow-hidden border border-slate-800">
        {selectedFile ? (
          <FileViewer file={selectedFile} />
        ) : (
          <div className="h-full flex items-center justify-center bg-slate-900/50 text-slate-400">
            <p>Select a file to view its content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;