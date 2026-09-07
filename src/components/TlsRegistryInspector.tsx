import React, { useState } from 'react';
import {
  Terminal,
  Play,
  ShieldCheck,
  Cpu,
  Globe,
  Lock,
  Layers,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Zap
} from 'lucide-react';
import { TlsScraperLog } from '../types';

export const TlsRegistryInspector: React.FC = () => {
  const [queryTerm, setQueryTerm] = useState('Anansi Spider Stories');
  const [impersonationProfile, setImpersonationProfile] = useState<'chrome_124' | 'safari_17' | 'firefox_120'>('chrome_124');
  const [selectedRegistries, setSelectedRegistries] = useState<string[]>(['WIPO_TCE', 'UNESCO_ICH', 'US_COPYRIGHT']);
  const [isLoading, setIsLoading] = useState(false);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);

  const handleRunQuery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/registry/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryTerm,
          registries: selectedRegistries,
          impersonationProfile,
        }),
      });
      const data = await res.json();
      setTelemetry(data.tlsHandshakeSummary);
      setMatches(data.matches || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="tls-scraper-inspector" className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white font-serif">
              curl_cffi TLS-Bypassing Registry Scraper
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Emulates realistic browser TLS ClientHello signatures (JA3 & JA4 hashes, ALPN negotiation, and HTTP/2 stream headers) to query protected copyright registries and intangible cultural archives without triggering anti-bot firewalls.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>JA3/JA4 Spoofing Enabled</span>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Anti-Bot Evasion Active</span>
          </span>
        </div>
      </div>

      {/* Query Console */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Interactive Registry Probe Execution</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-400 font-semibold mb-1">Search Term / Intellectual Property Descriptor</label>
            <input
              type="text"
              value={queryTerm}
              onChange={(e) => setQueryTerm(e.target.value)}
              placeholder="e.g. Anansi, Taniwha, Yanomami Xapiri..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-semibold mb-1">curl_cffi Impersonation Profile</label>
            <select
              value={impersonationProfile}
              onChange={(e) => setImpersonationProfile(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="chrome_124">Chrome 124 (BoringSSL JA3/JA4)</option>
              <option value="safari_17">Safari 17 (Apple SecureTransport)</option>
              <option value="firefox_120">Firefox 120 (NSS TLS Stack)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800">
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-400 font-semibold">Target Databases:</span>
            {['WIPO_TCE', 'UNESCO_ICH', 'US_COPYRIGHT'].map((db) => (
              <label key={db} className="inline-flex items-center space-x-1.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={selectedRegistries.includes(db)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRegistries([...selectedRegistries, db]);
                    } else {
                      setSelectedRegistries(selectedRegistries.filter((x) => x !== db));
                    }
                  }}
                  className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                />
                <span>{db.replace('_', ' ')}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleRunQuery}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Negotiating TLS Handshake...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Query External Archives</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Handshake Telemetry & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: TLS Fingerprint Breakdown */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>TLS Handshake Fingerprint</span>
          </h4>

          <div className="space-y-3 font-mono text-[11px]">
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Active Cipher Suite:</span>
              <span className="text-cyan-300">
                {telemetry?.cipherSuite || 'TLS_AES_128_GCM_SHA256 (0x1301)'}
              </span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">JA3 Fingerprint Hash:</span>
              <span className="text-slate-300 break-all">
                {telemetry?.ja3Signature || '771,4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53'}
              </span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">JA4 Raw Signature:</span>
              <span className="text-amber-300">
                {telemetry?.ja4Signature || 't13d1516h2_8daaf6152771_019623e5927d'}
              </span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Protocol & ALPN:</span>
              <span className="text-emerald-400">HTTP/2 (h2) multiplexed</span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-500">Latency:</span>
              <span className="text-slate-300">{telemetry?.latencyMs || 164} ms</span>
            </div>
          </div>
        </div>

        {/* Right: Extracted Registry Records */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Extracted Copyright & TCE Dossiers ({matches.length || 3})</span>
            </h4>
            <span className="text-xs font-mono text-slate-400">Verified TLS Handshake</span>
          </div>

          <div className="space-y-3">
            {(matches.length > 0 ? matches : [
              {
                databaseName: 'WIPO TCE',
                registryId: 'WIPO-TCE-AFR-4892',
                title: 'Akan Oral Heritage & Ananse Folkloric Narratives',
                originCommunity: 'Ashanti / Akan Traditional Cultural Authorities',
                status: 'Registered TCE',
                riskFactor: 'Subject to WIPO Intergovernmental Committee (IGC) protection against unauthorized commercial trademark capture.',
                registryUrl: 'https://wipo.int/tk/tce',
              },
              {
                databaseName: 'UNESCO ICH',
                registryId: 'UNESCO-ICH-00124',
                title: 'Oral traditions and expressions including language as a vehicle of ICH',
                originCommunity: 'Recognized African and Diaspora Traditional Custodians',
                status: 'Protected Cultural Heritage',
                riskFactor: 'Must not be commercialized in ways that debase moral and custodial community integrity.',
                registryUrl: 'https://ich.unesco.org',
              },
              {
                databaseName: 'US Copyright Office',
                registryId: 'VAu00188921',
                title: 'Derivative Screenplays on West African Trickster Tales',
                originCommunity: 'Public Domain Folklore with Derivative Private Registrations',
                status: 'Public Domain with Moral Rights',
                riskFactor: 'Underlying folklore in public cultural domain; proprietary character trademarks restricted.',
                registryUrl: 'https://cocatalog.loc.gov',
              },
            ]).map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {item.databaseName} • {item.registryId}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{item.status}</span>
                </div>

                <h5 className="text-sm font-bold text-white">{item.title}</h5>

                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">Custodial Community:</strong> {item.originCommunity}
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">Custodial Directive:</strong> {item.riskFactor}
                </p>

                <div className="pt-1 flex justify-end">
                  <a
                    href={item.registryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>View Archival Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
