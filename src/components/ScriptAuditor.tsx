import React, { useState } from 'react';
import {
  FileText,
  Play,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Terminal,
  Shield,
  Upload,
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import { ScriptPayload, AuditReport, ProductionPhase, ScriptType } from '../types';
import { SAMPLE_SCRIPTS } from '../data/sampleScripts';

interface ScriptAuditorProps {
  onAuditComplete: (report: AuditReport) => void;
  currentScreenplay?: ScriptPayload;
}

export const ScriptAuditor: React.FC<ScriptAuditorProps> = ({ onAuditComplete }) => {
  const [formData, setFormData] = useState<ScriptPayload>(SAMPLE_SCRIPTS[0].payload);
  const [activeSampleId, setActiveSampleId] = useState<string>(SAMPLE_SCRIPTS[0].id);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditStep, setAuditStep] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_SCRIPTS.find((s) => s.id === sampleId);
    if (sample) {
      setActiveSampleId(sample.id);
      setFormData(sample.payload);
      setValidationErrors([]);
    }
  };

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setValidationErrors([]);
    setAuditStep(1);

    // Multi-stage agent visual progression
    const t1 = setTimeout(() => setAuditStep(2), 600);
    const t2 = setTimeout(() => setAuditStep(3), 1400);

    try {
      const res = await fetch('/api/audit/screenplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        if (res.status === 422) {
          const errData = await res.json();
          setValidationErrors(errData.detail || []);
        } else {
          setValidationErrors([{ msg: `Server error (${res.status}) - Please verify backend status` }]);
        }
        setIsAuditing(false);
        clearTimeout(t1);
        clearTimeout(t2);
        return;
      }

      setAuditStep(4);
      const report: AuditReport = await res.json();
      setTimeout(() => {
        setIsAuditing(false);
        onAuditComplete(report);
      }, 700);
    } catch (err: any) {
      console.error('Audit execution failed:', err);
      setValidationErrors([{ msg: err.message || 'Network request failed' }]);
      setIsAuditing(false);
      clearTimeout(t1);
      clearTimeout(t2);
    }
  };

  const lineCount = formData.screenplayText ? formData.screenplayText.split('\n').length : 0;
  const wordCount = formData.screenplayText ? formData.screenplayText.trim().split(/\s+/).length : 0;

  return (
    <div id="script-auditor-workspace" className="space-y-6">
      {/* Sample Script Selector Pills */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Load Preset Hackathon Screening Scenarios:
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Click any preset to test edge cases instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_SCRIPTS.map((s) => {
            const isSelected = activeSampleId === s.id;
            return (
              <button
                key={s.id}
                id={`btn-sample-${s.id}`}
                onClick={() => handleSelectSample(s.id)}
                className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-sm'
                    : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold truncate text-white">{s.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 inline-block mb-1.5">
                    {s.tag}
                  </span>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.description}</p>
                </div>
                <div className="mt-2 text-[10px] text-amber-400/80 font-medium flex items-center space-x-1">
                  <span>{isSelected ? '✓ Loaded in Editor' : 'Load Payload →'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Errors Box (FastAPI Pydantic style) */}
      {validationErrors.length > 0 && (
        <div className="bg-rose-950/40 border border-rose-500/50 rounded-xl p-4 text-xs text-rose-300 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Pydantic Input Validation Error (422 Unprocessable Entity)</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-rose-300 font-mono text-[11px]">
            {validationErrors.map((err, idx) => (
              <li key={idx}>
                {err.loc ? `Field: ${err.loc.join('.')} — ` : ''}
                {err.msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Form & Screenplay Ingest Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Script Metadata & Production Parameters */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Screenplay Metadata</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Enforced via strict Pydantic data schemas</p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Title */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project / Script Title *</label>
              <input
                id="input-script-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. The Golden Web"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Logline */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Logline</label>
              <textarea
                id="input-script-logline"
                rows={2}
                value={formData.logline}
                onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
                placeholder="One or two sentence synopsis..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            {/* Genre & Territory */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Genre *</label>
                <input
                  type="text"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  placeholder="e.g. Mythological Adventure"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Territory</label>
                <input
                  type="text"
                  value={formData.targetTerritory}
                  onChange={(e) => setFormData({ ...formData, targetTerritory: e.target.value })}
                  placeholder="e.g. Global Theatrical"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>
            </div>

            {/* Production Phase & Script Type */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Production Phase *</label>
                <select
                  value={formData.productionPhase}
                  onChange={(e) => setFormData({ ...formData, productionPhase: e.target.value as ProductionPhase })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="Development">Development</option>
                  <option value="Pre-production">Pre-production</option>
                  <option value="Shooting">Shooting</option>
                  <option value="Post-production">Post-production</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Script Type *</label>
                <select
                  value={formData.scriptType}
                  onChange={(e) => setFormData({ ...formData, scriptType: e.target.value as ScriptType })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="Treatment">Treatment</option>
                  <option value="Dialogue Script">Dialogue Script</option>
                  <option value="Production Log">Production Log</option>
                  <option value="Character Bible">Character Bible</option>
                </select>
              </div>
            </div>

            {/* Flagged Motifs & Origin Cultures */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Known Cultural Motifs (comma separated)
              </label>
              <input
                type="text"
                value={formData.indigenousMotifsReferenced.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    indigenousMotifsReferenced: e.target.value.split(',').map((x) => x.trim()).filter(Boolean),
                  })
                }
                placeholder="e.g. Anansi the Spider, Adinkra Symbols"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Origin Communities / Cultures
              </label>
              <input
                type="text"
                value={formData.originCultures.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originCultures: e.target.value.split(',').map((x) => x.trim()).filter(Boolean),
                  })
                }
                placeholder="e.g. Akan, Ashanti, Ghana"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>
          </div>

          {/* Screening Trigger Button */}
          <div className="pt-2">
            <button
              id="btn-execute-audit"
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuditing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Auditing with Agentic Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Agentic Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Screenplay Payload Editor (2 cols span) */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Screenplay / Treatment Raw Payload</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Screenplay formatted in standard industry syntax (sluglines, dialogue, parentheticals, production notes)
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span>{lineCount} lines</span>
              <span>•</span>
              <span>{wordCount} words</span>
            </div>
          </div>

          {/* Text Area with Courier font */}
          <div className="relative flex-1">
            <textarea
              id="screenplay-textarea"
              rows={18}
              value={formData.screenplayText}
              onChange={(e) => setFormData({ ...formData, screenplayText: e.target.value })}
              placeholder="Paste or type script scenes, dialogue, treatments, or production memos here..."
              className="w-full h-full min-h-[380px] bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed focus:outline-none focus:border-amber-500/80 resize-y"
              style={{ fontFamily: '"Courier Prime", Courier, monospace' }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Screenplay text ready for Gemini 2.5 Flash analysis</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Payload automatically validated by Pydantic before inference
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Agent Pipeline Execution Overlay */}
      {isAuditing && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Wurldcoco AI Agentic Pipeline Active</h3>
              <p className="text-xs text-slate-400">
                Auditing "{formData.title}" for indigenous cultural sovereignty and copyright protection
              </p>
            </div>

            {/* Pipeline Stage Steps */}
            <div className="space-y-3 text-xs font-mono">
              {/* Step 1 */}
              <div className={`p-3 rounded-lg border flex items-center space-x-3 transition-all ${
                auditStep >= 1 ? 'bg-slate-950 border-amber-500/40 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  auditStep > 1 ? 'bg-emerald-500 text-slate-950' : auditStep === 1 ? 'bg-amber-400 text-slate-950 animate-spin' : 'bg-slate-800 text-slate-400'
                }`}>
                  {auditStep > 1 ? '✓' : '1'}
                </div>
                <div>
                  <div className="font-bold">Step 1: Pydantic Validation & Ingestion</div>
                  <div className="text-[11px] text-slate-400">Sanitizing payload against ScreenplayAuditRequest model</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`p-3 rounded-lg border flex items-center space-x-3 transition-all ${
                auditStep >= 2 ? 'bg-slate-950 border-cyan-500/40 text-cyan-300' : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  auditStep > 2 ? 'bg-emerald-500 text-slate-950' : auditStep === 2 ? 'bg-cyan-400 text-slate-950 animate-spin' : 'bg-slate-800 text-slate-400'
                }`}>
                  {auditStep > 2 ? '✓' : '2'}
                </div>
                <div>
                  <div className="font-bold">Step 2: curl_cffi TLS-Bypassing Registry Scrape</div>
                  <div className="text-[11px] text-slate-400">Querying WIPO TCE, UNESCO ICH, and USCO with JA3/JA4 spoofing</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`p-3 rounded-lg border flex items-center space-x-3 transition-all ${
                auditStep >= 3 ? 'bg-slate-950 border-amber-500/40 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  auditStep > 3 ? 'bg-emerald-500 text-slate-950' : auditStep === 3 ? 'bg-amber-400 text-slate-950 animate-spin' : 'bg-slate-800 text-slate-400'
                }`}>
                  {auditStep > 3 ? '✓' : '3'}
                </div>
                <div>
                  <div className="font-bold">Step 3: Google GenAI Contextual Reasoning (gemini-2.5-flash)</div>
                  <div className="text-[11px] text-slate-400">Contextual evaluation of dialogue, character arcs, and customary taboos</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`p-3 rounded-lg border flex items-center space-x-3 transition-all ${
                auditStep >= 4 ? 'bg-slate-950 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  auditStep === 4 ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {auditStep === 4 ? '✓' : '4'}
                </div>
                <div>
                  <div className="font-bold">Step 4: Clearance Report & Remediation Protocol</div>
                  <div className="text-[11px] text-slate-400">Synthesizing ethical rewrites and Free Prior Informed Consent plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
