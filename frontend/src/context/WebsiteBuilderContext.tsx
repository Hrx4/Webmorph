import React, { createContext, useContext, useState } from 'react';

interface WebsiteBuilderContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: Step[];
  files: File[];
}

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface File {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: File[];
}

const defaultSteps: Step[] = [
  {
    id: 1,
    title: 'Analyzing prompt',
    description: 'Understanding your requirements and preferences.',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Generating website structure',
    description: 'Creating files and folders for your website.',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Implementing components',
    description: 'Building UI components based on your requirements.',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Styling website',
    description: 'Applying visual design and responsiveness.',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Finalizing project',
    description: 'Completing the website and preparing for preview.',
    status: 'pending',
  },
];

const defaultFiles: File[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'App.js',
        type: 'file',
        language: 'javascript',
        content: "import React from 'react';\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;",
      },
      {
        id: '3',
        name: 'index.js',
        type: 'file',
        language: 'javascript',
        content: "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);",
      },
      {
        id: '4',
        name: 'styles',
        type: 'folder',
        children: [
          {
            id: '5',
            name: 'style.css',
            type: 'file',
            language: 'css',
            content: "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n.App {\n  text-align: center;\n}",
          },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'public',
    type: 'folder',
    children: [
      {
        id: '7',
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Generated Website</title>\n</head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>",
      },
    ],
  },
  {
    id: '8',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: "{\n  \"name\": \"generated-website\",\n  \"version\": \"0.1.0\",\n  \"private\": true,\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\"\n  }\n}",
  },
];

const WebsiteBuilderContext = createContext<WebsiteBuilderContextType>({
  prompt: '',
  setPrompt: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  steps: defaultSteps,
  files: defaultFiles,
});

export const useWebsiteBuilder = () => useContext(WebsiteBuilderContext);

export const WebsiteBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, _setSteps] = useState<Step[]>(defaultSteps);
  const [files, _setFiles] = useState<File[]>(defaultFiles);

  return (
    <WebsiteBuilderContext.Provider
      value={{
        prompt,
        setPrompt,
        currentStep,
        setCurrentStep,
        steps,
        files,
      }}
    >
      {children}
    </WebsiteBuilderContext.Provider>
  );
};