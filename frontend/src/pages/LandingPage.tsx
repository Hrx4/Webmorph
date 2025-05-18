import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Code, ArrowRight, Github } from 'lucide-react';
import { useWebsiteBuilder } from '../context/WebsiteBuilderContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPrompt } = useWebsiteBuilder();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setPrompt(inputValue.trim());
      navigate('/builder');
    }
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleInputBlur = () => {
    if (!inputValue.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      <header className="py-6 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400" size={24} />
          <h1 className="text-xl font-bold">SiteForge</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300">
            Gallery
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300">
            Docs
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors duration-300"
          >
            <Github size={18} />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
            Create beautiful websites with AI
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Turn your ideas into fully-featured websites in seconds with just a prompt.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <form 
            onSubmit={handleSubmit}
            className={`relative bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 p-4 transition-all duration-500 ${
              isExpanded ? 'shadow-xl shadow-purple-900/20' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="mt-2 mr-3">
                <Code size={20} className="text-purple-400" />
              </div>
              <div className="flex-grow">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Describe the website you want to create..."
                  className={`w-full bg-transparent text-white resize-none outline-none transition-all duration-300 ${
                    isExpanded ? 'h-32' : 'h-10'
                  }`}
                ></textarea>
                {isExpanded && (
                  <div className="text-xs text-slate-400 mt-2">
                    <p>Be as specific as possible about design, features, and functionality.</p>
                  </div>
                )}
              </div>
            </div>
            <div className={`flex justify-end mt-2 transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  inputValue.trim()
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Generate</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Lightning Fast',
              description: 'Create a fully-featured website in seconds, not hours or days.',
              icon: '⚡️',
            },
            {
              title: 'Customizable',
              description: 'Edit and refine your generated website with our visual editor.',
              icon: '🎨',
            },
            {
              title: 'Production Ready',
              description: 'Download source code or deploy directly to your hosting provider.',
              icon: '🚀',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 transition-transform duration-300 hover:translate-y-[-4px]"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;