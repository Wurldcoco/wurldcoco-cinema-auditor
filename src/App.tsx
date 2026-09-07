import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScriptAuditor } from './components/ScriptAuditor';
import { AuditReportView } from './components/AuditReportView';
import { FolkloreEngine } from './components/FolkloreEngine';
import { TlsRegistryInspector } from './components/TlsRegistryInspector';
import { SwaggerDocsViewer } from './components/SwaggerDocsViewer';
import { AuditReport, ScriptPayload } from './types';
import { ShieldCheck, Sparkles, Terminal, FileCode2, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'auditor' | 'folklore' | 'tls' | 'swagger'>('auditor');
  const [currentReport, setCurrentReport] = useState<AuditReport | null>(null);

  const handleAuditComplete = (report: AuditReport) => {
    setCurrentReport(report);
  };

  const handleResetAudit = () => {
    setCurrentReport(null);
  };

  const handleSelectMotifForAudit = (motifName: string, culture: string) => {
    setActiveTab('auditor');
    setCurrentReport(null);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'auditor' && (
          <div>
            {currentReport ? (
              <AuditReportView
                report={currentReport}
                onReset={handleResetAudit}
              />
            ) : (
              <ScriptAuditor onAuditComplete={handleAuditComplete} />
            )}
          </div>
        )}

        {activeTab === 'folklore' && (
          <FolkloreEngine onSelectMotifForAudit={handleSelectMotifForAudit} />
        )}

        {activeTab === 'tls' && <TlsRegistryInspector />}

        {activeTab === 'swagger' && <SwaggerDocsViewer />}
      </main>

      {/* Cinema Hackathon Footer */}
      <footer className="bg-[#0B0F17] border-t border-slate-800/80 py-6 text-slate-400 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-serif text-[10px]">
              W
            </div>
            <span className="font-semibold text-slate-300">Wurldcoco AI</span>
            <span>•</span>
            <span>Agentic Cinema Hackathon Project</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-slate-400">
              Built with: <strong className="text-slate-200">FastAPI Architecture</strong> • <strong className="text-slate-200">gemini-2.5-flash</strong> • <strong className="text-slate-200">curl_cffi TLS Evasion</strong> • <strong className="text-slate-200">Pydantic</strong>
            </span>
            <span>•</span>
            <a
              href="/docs"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              Interactive Swagger API (/docs)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
