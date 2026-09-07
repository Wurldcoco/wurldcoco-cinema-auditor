import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Layers,
  Clock,
  Compass,
  Scale
} from 'lucide-react';
import { AuditReport, RiskLevel } from '../types';

interface AuditReportViewProps {
  report: AuditReport;
  onReset: () => void;
  onApplyRewrite?: (excerpt: string, rewrite: string) => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ report, onReset, onApplyRewrite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lines' | 'motifs' | 'registries' | 'remediation' | 'reasoning'>('overview');
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [copiedRewriteIdx, setCopiedRewriteIdx] = useState<number | null>(null);

  const getVerdictStyle = (verdict: AuditReport['clearanceVerdict']) => {
    switch (verdict) {
      case 'CLEARED FOR PRODUCTION':
        return {
          bg: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300',
          badge: 'bg-emerald-500 text-slate-950',
          icon: ShieldCheck,
          text: 'CLEARED FOR PRODUCTION',
        };
      case 'CONDITIONAL CLEARANCE':
        return {
          bg: 'bg-amber-950/40 border-amber-500/50 text-amber-300',
          badge: 'bg-amber-500 text-slate-950',
          icon: AlertTriangle,
          text: 'CONDITIONAL CLEARANCE - PROTOCOLS REQUIRED',
        };
      case 'HIGH RISK - REVISE':
        return {
          bg: 'bg-orange-950/40 border-orange-500/50 text-orange-300',
          badge: 'bg-orange-500 text-slate-950',
          icon: AlertTriangle,
          text: 'HIGH RISK - WRITERS ROOM REVISION REQUIRED',
        };
      case 'HALT - DIRECT VIOLATION':
      default:
        return {
          bg: 'bg-rose-950/40 border-rose-500/50 text-rose-300',
          badge: 'bg-rose-500 text-white',
          icon: ShieldAlert,
          text: 'HALT - DIRECT CULTURAL TABOO OR IP VIOLATION',
        };
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'SAFE':
        return <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">SAFE</span>;
      case 'CAUTION':
        return <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">CAUTION</span>;
      case 'HIGH_RISK':
        return <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-orange-500/15 text-orange-300 border border-orange-500/30">HIGH RISK</span>;
      case 'CRITICAL':
        return <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">CRITICAL</span>;
    }
  };

  const verdictConfig = getVerdictStyle(report.clearanceVerdict);
  const VerdictIcon = verdictConfig.icon;

  const handleCopyMemo = () => {
    const memo = `WURLDCOCO AI — CINEMA PRODUCTION CLEARANCE MEMO
Screenplay Title: ${report.screenplayTitle}
Phase: ${report.productionPhase} (${report.scriptType})
Clearance Verdict: ${report.clearanceVerdict}
Overall Score: ${report.overallScore}/100
Audited By: ${report.auditedBy}
Timestamp: ${report.timestamp}

EXECUTIVE ASSESSMENT:
${report.summaryAssessment}

RISK BREAKDOWN:
- Indigenous Sovereignty & Rights: ${report.indigenousRightsRisk}
- Copyright & Trademark Overreach: ${report.copyrightInfringementRisk}
- Sacred Knowledge / Secret Taboos: ${report.sacredKnowledgeRisk}
- Commercial Misappropriation: ${report.commercialMisappropriationRisk}

IDENTIFIED MOTIFS:
${report.motifsIdentified.map(m => `* ${m.motif} (${m.originCulture}) - Risk: ${m.misappropriationRisk}. Clearance Protocol: ${m.clearanceProtocol}`).join('\n')}

FLAGGED SCRIPT LINES:
${report.problematicLines.map(l => `* Line ${l.lineNumber || 'Ref'}: "${l.excerpt}" [${l.category}] -> Suggested Rewrite: "${l.suggestedRewrite}"`).join('\n')}

REMEDIATION ROADMAP:
${report.remediationPlan.map(r => `* [${r.phase}] ${r.title}: ${r.actionRequired} (Contact: ${r.communityConsultationContact})`).join('\n')}
`;
    navigator.clipboard.writeText(memo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  const handleCopyRewrite = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedRewriteIdx(idx);
    setTimeout(() => setCopiedRewriteIdx(null), 2000);
  };

  return (
    <div id="audit-report-container" className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Audit Dossier #{report.id}</span>
          <h2 className="text-xl font-bold text-white font-serif">{report.screenplayTitle}</h2>
          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
            <span>{report.productionPhase}</span>
            <span>•</span>
            <span>{report.scriptType}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Audited in {report.executionDurationMs}ms</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            id="copy-memo-btn"
            onClick={handleCopyMemo}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMemo ? 'Clearance Memo Copied!' : 'Copy Clearance Memo'}</span>
          </button>

          <button
            id="audit-new-script-btn"
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors font-sans"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Audit Another Script</span>
          </button>
        </div>
      </div>

      {/* Main Verdict & Gauge Header Card */}
      <div className={`p-6 rounded-xl border ${verdictConfig.bg} relative overflow-hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-black/40 border border-white/10">
              <VerdictIcon className="w-4 h-4" />
              <span>{verdictConfig.text}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white font-serif">
              Cultural & Intellectual Property Clearance Status
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {report.summaryAssessment}
            </p>
          </div>

          {/* 0-100 Radial/Metric Score */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 min-w-[170px]">
            <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400">Safety Index</span>
            <div className="relative my-1">
              <span className={`text-4xl font-black font-mono ${
                report.overallScore >= 75 ? 'text-emerald-400' :
                report.overallScore >= 50 ? 'text-amber-400' :
                report.overallScore >= 30 ? 'text-orange-400' : 'text-rose-400'
              }`}>
                {report.overallScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  report.overallScore >= 75 ? 'bg-emerald-500' :
                  report.overallScore >= 50 ? 'bg-amber-500' :
                  report.overallScore >= 30 ? 'bg-orange-500' : 'bg-rose-500'
                }`}
                style={{ width: `${report.overallScore}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 text-center">
              {report.overallScore >= 75 ? 'Low Ethical Legal Risk' :
               report.overallScore >= 50 ? 'Protocol Adherence Required' :
               report.overallScore >= 30 ? 'Substantial Revision Needed' : 'Severe Customary Infringement'}
            </span>
          </div>
        </div>

        {/* 4 Pillars Risk Sub-Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/60">
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Indigenous Rights</span>
            <div className="flex items-center justify-between">
              {getRiskBadge(report.indigenousRightsRisk)}
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Copyright / Trademark</span>
            <div className="flex items-center justify-between">
              {getRiskBadge(report.copyrightInfringementRisk)}
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Sacred Taboos</span>
            <div className="flex items-center justify-between">
              {getRiskBadge(report.sacredKnowledgeRisk)}
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Misappropriation</span>
            <div className="flex items-center justify-between">
              {getRiskBadge(report.commercialMisappropriationRisk)}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab('lines')}
          className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
            activeTab === 'lines'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Line-by-Line Script Markers</span>
          <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded text-[10px] font-bold">
            {report.problematicLines.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('motifs')}
          className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
            activeTab === 'motifs'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Cultural Motifs & Custodians</span>
          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded text-[10px] font-bold">
            {report.motifsIdentified.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('registries')}
          className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
            activeTab === 'registries'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>WIPO / Registry Matches</span>
          <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded text-[10px] font-bold">
            {report.registryVerifications.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('remediation')}
          className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
            activeTab === 'remediation'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Remediation Roadmap</span>
          <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
            {report.remediationPlan.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('reasoning')}
          className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
            activeTab === 'reasoning'
              ? 'bg-slate-800 text-amber-400 border border-amber-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Agentic Reasoning Trace</span>
        </button>
      </div>

      {/* Tab 1: Executive Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Summary & Immediate Directives */}
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <FileCheck className="w-4 h-4" />
                <span>Auditor Executive Brief</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {report.summaryAssessment}
              </p>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Production Phase Directives:</span>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Script Type Ingested: <strong className="text-slate-200">{report.scriptType}</strong></li>
                  <li>Targeting <strong className="text-slate-200">{report.productionPhase}</strong> production pipeline</li>
                  <li>Estimated Legal Exposure: <strong className={report.overallScore < 50 ? 'text-rose-400' : 'text-amber-400'}>
                    {report.overallScore < 50 ? 'High Liability (Litigation or Public Boycott)' : 'Moderate (Remediable via Protocol)'}
                  </strong></li>
                </ul>
              </div>
            </div>

            {/* Right: Quick Highlights & Actions */}
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <Scale className="w-4 h-4" />
                <span>Critical Clearance Points</span>
              </h4>

              <div className="space-y-3">
                {report.problematicLines.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/80 rounded-lg border border-rose-950/40 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-rose-400 font-bold">Line {item.lineNumber || idx + 1} • {item.category}</span>
                      <span className="uppercase text-[10px] px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded font-bold">{item.severity}</span>
                    </div>
                    <p className="text-slate-300 italic mb-1.5 font-mono text-[11px] bg-slate-900 p-1.5 rounded">
                      "{item.excerpt}"
                    </p>
                    <p className="text-slate-400 text-[11px]">{item.critique}</p>
                  </div>
                ))}

                {report.problematicLines.length === 0 && (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                    No critical line infractions detected in this payload!
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('lines')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-semibold transition-colors"
                >
                  View All {report.problematicLines.length} Flagged Screenplay Passages →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Line-by-Line Screenplay Markers */}
      {activeTab === 'lines' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">Line-by-Line Script Annotations & Ethical Rewrites</h4>
              <p className="text-xs text-slate-400">
                Screenplay dialogue, stage directions, and production notes flagged for cultural distortion, sacred taboos, or copyright risk.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              {report.problematicLines.length} Markers Flagged
            </span>
          </div>

          <div className="space-y-4">
            {report.problematicLines.map((line, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      Line {line.lineNumber || idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-amber-300">
                      {line.category}
                    </span>
                    {line.customaryProtocolRef && (
                      <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                        Protocol: {line.customaryProtocolRef}
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] uppercase font-bold px-2 py-0.5 rounded ${
                    line.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    line.severity === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {line.severity} Severity
                  </span>
                </div>

                {/* Original Excerpt */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">Flagged Script Excerpt</span>
                  <div className="p-3 bg-slate-950 rounded-lg border border-rose-950/50 font-mono text-xs text-rose-200/90 leading-relaxed">
                    {line.excerpt}
                  </div>
                </div>

                {/* Cultural & Legal Critique */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-300">Cultural & Legal Critique:</span>
                  <p className="text-slate-400 leading-relaxed">{line.critique}</p>
                </div>

                {/* Suggested Ethical Rewrite */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Ethical Rewrite</span>
                    </span>
                    <button
                      onClick={() => handleCopyRewrite(line.suggestedRewrite, idx)}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-mono"
                    >
                      {copiedRewriteIdx === idx ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Rewrite</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-500/30 font-mono text-xs text-emerald-200/90 leading-relaxed">
                    {line.suggestedRewrite}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Cultural Motifs & Custodians */}
      {activeTab === 'motifs' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-white">Identified Cultural Motifs & Traditional Knowledge</h4>
            <p className="text-xs text-slate-400">
              Analysis of sacred vs. public domain designations, origin communities, and Free Prior and Informed Consent (FPIC) mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.motifsIdentified.map((motif, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h5 className="font-bold text-white text-base font-serif">{motif.motif}</h5>
                  {getRiskBadge(motif.misappropriationRisk)}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Origin Culture:</span>
                    <span className="font-semibold text-slate-200">{motif.originCulture}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Custodian Community:</span>
                    <span className="font-semibold text-slate-200 text-right">{motif.custodianCommunity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Sacred / Domain Status:</span>
                    <span className="font-semibold text-amber-400">{motif.sacredStatus}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">FPIC Community Consent:</span>
                    <span className={`font-semibold ${motif.communityConsentRequired ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {motif.communityConsentRequired ? 'Mandatory Community Consent' : 'Permitted Public Folklore'}
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">Customary Protocols & Guidance:</span>
                  <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    {motif.customaryLawNotes}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-emerald-400 block mb-1">Required Clearance Action:</span>
                  <p className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 leading-relaxed">
                    {motif.clearanceProtocol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: WIPO & Registry Matches */}
      {activeTab === 'registries' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">External Registry Verifications & Archival Records</h4>
              <p className="text-xs text-slate-400">
                Cross-referenced via curl_cffi TLS-bypassing scraper across WIPO Traditional Cultural Expressions, UNESCO ICH, and USCO.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
              TLS JA3/JA4 Bypassed
            </span>
          </div>

          <div className="space-y-3">
            {report.registryVerifications.map((match, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {match.databaseName}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{match.registryId}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {match.status}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white font-sans">{match.title}</h5>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>
                    <strong className="text-slate-300">Community Custodians:</strong> {match.originCommunity}
                  </div>
                  <div>
                    <strong className="text-slate-300">Risk & Custodial Factor:</strong> {match.riskFactor}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                  <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Scraped successfully via TLS bypass</span>
                  </span>
                  <a
                    href={match.registryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>View Registry Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Remediation Roadmap */}
      {activeTab === 'remediation' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-white">Actionable Pre-Production Remediation Roadmap</h4>
            <p className="text-xs text-slate-400">
              Step-by-step measures for film producers, showrunners, and legal departments to achieve verified cultural clearance.
            </p>
          </div>

          <div className="space-y-3">
            {report.remediationPlan.map((plan, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h5 className="font-bold text-white text-sm">{plan.title}</h5>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-amber-300">
                    {plan.phase}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-semibold">Action Required:</span>
                    <p className="text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                      {plan.actionRequired}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block mb-1">Designated Consultation Contact:</span>
                      <span className="font-semibold text-slate-200">{plan.communityConsultationContact}</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block mb-1">Benefit-Sharing Protocol:</span>
                      <span className="font-semibold text-emerald-400">{plan.benefitSharingGuidance}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Agentic Reasoning Trace */}
      {activeTab === 'reasoning' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-white">Agentic Chain-of-Thought & Autonomous Deductions</h4>
            <p className="text-xs text-slate-400">
              Audit execution trace showing real-time agent verification steps across Pydantic validation, curl_cffi scraping, and Gemini 2.5 Flash reasoning.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {report.agenticReasoningTrace.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/60 pb-1.5">
                  <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>{step.agentRole}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{new Date(step.timestamp).toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Observation:</span>
                  <p className="text-slate-300">{step.observation}</p>
                </div>
                <div>
                  <span className="text-emerald-400 text-[11px] block font-semibold">Agentic Deduction:</span>
                  <p className="text-emerald-300/90">{step.deduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
