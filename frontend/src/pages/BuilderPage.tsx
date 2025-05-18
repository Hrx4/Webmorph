import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Circle, Loader, Code, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';
import FileExplorer from '../components/FileExplorer';
import PreviewPane from '../components/PreviewPane';

const BuilderPage: React.FC = () => {
  const { prompt, currentStep, setCurrentStep, steps, files } = useWebsiteBuilder();
  const [showPreview, setShowPreview] = useState(false);

  // Simulate steps progress
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length, setCurrentStep]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="py-4 px-6 border-b border-slate-800 flex items-center">
        <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>
        <h1 className="text-xl font-semibold ml-6">Building your website</h1>
      </header>

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Steps sidebar */}
        <div className="w-full md:w-96 border-r border-slate-800 overflow-y-auto bg-slate-900">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Your prompt</h2>
              <div className="bg-slate-800 rounded-lg p-4 text-slate-300">
                {prompt || "Create a personal portfolio website with a dark theme, project showcase, and contact form."}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Progress</h2>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  let StatusIcon;
                  
                  if (index < currentStep) {
                    StatusIcon = () => <CheckCircle size={20} className="text-green-500 shrink-0" />;
                  } else if (index === currentStep) {
                    StatusIcon = () => <Loader size={20} className="text-purple-500 shrink-0 animate-spin" />;
                  } else {
                    StatusIcon = () => <Circle size={20} className="text-slate-600 shrink-0" />;
                  }

                  return (
                    <div 
                      key={step.id}
                      className={`flex items-start p-4 rounded-lg ${
                        index === currentStep ? 'bg-slate-800/70' : 'hover:bg-slate-800/50'
                      } transition-colors`}
                    >
                      <StatusIcon />
                      <div className="ml-3">
                        <h3 className={`font-medium ${
                          index < currentStep 
                            ? 'text-green-400' 
                            : index === currentStep 
                              ? 'text-purple-400' 
                              : 'text-slate-400'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* File explorer and preview */}
        <div className="flex-grow overflow-y-auto bg-slate-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium">Files</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !showPreview 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Code size={16} />
                <span>Code</span>
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showPreview 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            </div>
          </div>
          
          <div className="h-[calc(100vh-180px)]">
            {showPreview ? <PreviewPane /> : <FileExplorer files={files} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;