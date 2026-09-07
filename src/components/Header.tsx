import React from 'react';
import { ShieldCheck, Sparkles, Terminal, FileCode2, BookOpen, ExternalLink, Cpu, Database } from 'lucide-react';

interface HeaderProps {
  activeTab: 'auditor' | 'folklore' | 'tls' | 'swagger';
  setActiveTab: (tab: 'auditor' | 'folklore' | 'tls' | 'swagger') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header id="app-header" className="bg-[#0B0F17] border-b border-slate-800 text-slate-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/30">
              <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl font-black tracking-tight text-white font-serif">
                  Wurldcoco <span className="text-amber-400 font-sans font-bold">AI</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Agentic Cinema Hackathon
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Agentic IP & Cultural Rights Auditor • Safeguarding Indigenous Heritage in Screenwriting
              </p>
            </div>
          </div>

          {/* Architecture Status Badges */}
          <div className="hidden lg:flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono font-medium">FastAPI Engine</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-300">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-medium">gemini-2.5-flash</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono font-medium">curl_cffi TLS</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-purple-300">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono font-medium">Pydantic Strict</span>
            </div>
          </div>

          {/* Direct Docs Button */}
          <div className="flex items-center space-x-2">
            <a
              id="swagger-direct-link"
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Open standalone Swagger UI documentation at /docs"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>/docs</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-t border-slate-800/80 pt-2 pb-1 overflow-x-auto">
          <button
            id="tab-auditor"
            onClick={() => setActiveTab('auditor')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'auditor'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Script & Treatment Auditor</span>
          </button>

          <button
            id="tab-folklore"
            onClick={() => setActiveTab('folklore')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'folklore'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Folklore Preservation Engine</span>
          </button>

          <button
            id="tab-tls"
            onClick={() => setActiveTab('tls')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'tls'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>curl_cffi TLS Registry Scraper</span>
          </button>

          <button
            id="tab-swagger"
            onClick={() => setActiveTab('swagger')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === 'swagger'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>FastAPI Swagger Explorer</span>
          </button>
        </div>
      </div>
    </header>
  );
};
