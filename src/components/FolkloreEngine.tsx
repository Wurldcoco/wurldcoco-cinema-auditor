import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { FOLKLORE_DATABASE } from '../data/folkloreDatabase';
import { FolkloreMotifRecord } from '../types';

interface FolkloreEngineProps {
  onSelectMotifForAudit?: (motifName: string, culture: string) => void;
}

export const FolkloreEngine: React.FC<FolkloreEngineProps> = ({ onSelectMotifForAudit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<FolkloreMotifRecord>(FOLKLORE_DATABASE[0]);

  const regions = ['ALL', 'West Africa', 'Aotearoa', 'American Southwest', 'Amazon Rainforest', 'Hawaiʻi', 'Australia'];

  const filteredRecords = FOLKLORE_DATABASE.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.culture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.wipoClassification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === 'ALL' || rec.region.toLowerCase().includes(selectedRegion.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' || rec.sacredVsPublic === selectedStatus;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div id="folklore-preservation-engine" className="space-y-6">
      {/* Engine Header */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white font-serif">
              Folklore & Traditional Knowledge Preservation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Cross-referencing traditional cultural expressions (TCE), indigenous customary laws, and WIPO treaties to prevent cultural misappropriation and enable respectful cinematic adaptation.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <strong>{FOLKLORE_DATABASE.length}</strong> Curated Archetypes
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            WIPO TCE Aligned
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search motif, deity, tribe, or proverb..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Filter by Region: All Continents</option>
            {regions.filter((r) => r !== 'ALL').map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Filter by Sacred Status: All</option>
            <option value="Sacred / Secret">Sacred / Secret (Strict Taboo)</option>
            <option value="Communal Custody">Communal Custody (FPIC Required)</option>
            <option value="General Folklore">General Folklore (Permitted Public Lore)</option>
          </select>
        </div>
      </div>

      {/* Dual Panel Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Motifs */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between px-1">
            <span>Motifs Catalog ({filteredRecords.length})</span>
            <span>Select to inspect</span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredRecords.map((item) => {
              const isSelected = selectedRecord?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white font-serif">{item.name}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.sacredVsPublic === 'Sacred / Secret'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.sacredVsPublic === 'Communal Custody'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.sacredVsPublic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mb-1.5">{item.culture} • {item.region}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              );
            })}

            {filteredRecords.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
                No motifs matched your query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep-Dive Dossier */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-5">
          {selectedRecord ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                    {selectedRecord.wipoClassification}
                  </span>
                  <h3 className="text-2xl font-black text-white font-serif">{selectedRecord.name}</h3>
                  <p className="text-xs text-slate-400">
                    Culture: <strong className="text-slate-200">{selectedRecord.culture}</strong> | Region: <strong className="text-slate-200">{selectedRecord.region}</strong>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedRecord.sacredVsPublic === 'Sacred / Secret'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : selectedRecord.sacredVsPublic === 'Communal Custody'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {selectedRecord.sacredVsPublic}
                  </span>

                  {onSelectMotifForAudit && (
                    <button
                      onClick={() => onSelectMotifForAudit(selectedRecord.name, selectedRecord.culture)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                    >
                      <span>Audit Script With This Motif</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mythos & Summary */}
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                  Oral Tradition & Narrative Significance
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {selectedRecord.summary}
                </p>
              </div>

              {/* Customary Law & WIPO Status */}
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                  Customary Law & Intellectual Property Obligations
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {selectedRecord.customaryLaw}
                </p>
              </div>

              {/* Filmmaking Do's and Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* DO */}
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Filmmaking & Screenwriting Best Practices</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedRecord.filmmakingDoAndDont.do.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONT */}
                <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    <span>Forbidden Misappropriations & Pitfalls</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedRecord.filmmakingDoAndDont.dont.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sample Permitted Usage */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Recommended Cinema Adaptation Scope: </strong>
                  <span>{selectedRecord.samplePermittedUsage}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-500">Select a motif from the catalog to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
};
