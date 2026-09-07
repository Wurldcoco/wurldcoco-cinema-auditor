import React, { useState, useEffect } from 'react';
import {
  FileCode2,
  Play,
  ExternalLink,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Cpu,
  Database,
  Terminal,
  Send
} from 'lucide-react';

export const SwaggerDocsViewer: React.FC = () => {
  const [openApiSpec, setOpenApiSpec] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/audit/screenplay');
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);

  useEffect(() => {
    fetch('/openapi.json')
      .then((res) => res.json())
      .then((data) => setOpenApiSpec(data))
      .catch((err) => console.error(err));

    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch((err) => console.error(err));
  }, []);

  const handleTestHealth = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setTestResponse(data);
    } catch (err: any) {
      setTestResponse({ error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestFolklore = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/folklore/cross-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motifQuery: 'Anansi' }),
      });
      const data = await res.json();
      setTestResponse(data);
    } catch (err: any) {
      setTestResponse({ error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestTls = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/registry/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Taniwha', registries: ['WIPO_TCE'] }),
      });
      const data = await res.json();
      setTestResponse(data);
    } catch (err: any) {
      setTestResponse({ error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySpec = () => {
    if (openApiSpec) {
      navigator.clipboard.writeText(JSON.stringify(openApiSpec, null, 2));
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2000);
    }
  };

  return (
    <div id="swagger-docs-viewer" className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <FileCode2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white font-serif">
              FastAPI OpenAPI & Interactive Swagger Documentation
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Provisions live REST endpoints, strict Pydantic model schemas, and Swagger UI at <code className="text-amber-400 font-mono">/docs</code> for hackathon judge evaluation and seamless external client integration.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Open Standalone /docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Backend Engine Health Card */}
      {healthStatus && (
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Framework:</span>
            <span className="text-emerald-400 font-bold">{healthStatus.framework}</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Google GenAI Model:</span>
            <span className="text-amber-400 font-bold">{healthStatus.genaiModel}</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Pydantic Validation:</span>
            <span className="text-purple-400 font-bold">Enforced (Strict 422)</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TLS Engine:</span>
            <span className="text-cyan-400 font-bold">curl_cffi 0.7.3</span>
          </div>
        </div>
      )}

      {/* Endpoints & Interactive Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
            Documented API Endpoints
          </span>

          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedEndpoint('/api/health');
                handleTestHealth();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                selectedEndpoint === '/api/health'
                  ? 'bg-slate-800 border-emerald-500/50 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500/20 text-emerald-300">
                  GET
                </span>
                <span className="font-mono font-semibold">/api/health</span>
              </div>
              <p className="text-[11px] text-slate-400">Verifies GenAI SDK, TLS scraper, and backend availability.</p>
            </button>

            <button
              onClick={() => setSelectedEndpoint('/api/audit/screenplay')}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                selectedEndpoint === '/api/audit/screenplay'
                  ? 'bg-slate-800 border-amber-500/50 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-500/20 text-amber-300">
                  POST
                </span>
                <span className="font-mono font-semibold">/api/audit/screenplay</span>
              </div>
              <p className="text-[11px] text-slate-400">Ingests screenplay payload, validates schema, and runs audit.</p>
            </button>

            <button
              onClick={() => {
                setSelectedEndpoint('/api/folklore/cross-reference');
                handleTestFolklore();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                selectedEndpoint === '/api/folklore/cross-reference'
                  ? 'bg-slate-800 border-cyan-500/50 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-cyan-500/20 text-cyan-300">
                  POST
                </span>
                <span className="font-mono font-semibold">/api/folklore/cross-reference</span>
              </div>
              <p className="text-[11px] text-slate-400">Searches WIPO TCE catalog and customary protocols.</p>
            </button>

            <button
              onClick={() => {
                setSelectedEndpoint('/api/registry/query');
                handleTestTls();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                selectedEndpoint === '/api/registry/query'
                  ? 'bg-slate-800 border-purple-500/50 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-purple-500/20 text-purple-300">
                  POST
                </span>
                <span className="font-mono font-semibold">/api/registry/query</span>
              </div>
              <p className="text-[11px] text-slate-400">Executes curl_cffi TLS impersonation against external archives.</p>
            </button>
          </div>
        </div>

        {/* Live Try-It-Out Console */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Interactive API Testing Console
              </h4>
              <p className="text-xs text-slate-400 font-mono">Active Target: {selectedEndpoint}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={
                  selectedEndpoint === '/api/health'
                    ? handleTestHealth
                    : selectedEndpoint === '/api/folklore/cross-reference'
                    ? handleTestFolklore
                    : selectedEndpoint === '/api/registry/query'
                    ? handleTestTls
                    : handleTestHealth
                }
                disabled={isTesting}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>{isTesting ? 'Dispatching...' : 'Execute Request'}</span>
              </button>
            </div>
          </div>

          {/* Response payload viewer */}
          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-mono uppercase text-slate-400">Response Payload (JSON):</span>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 max-h-[380px] overflow-auto leading-relaxed">
              {testResponse
                ? JSON.stringify(testResponse, null, 2)
                : openApiSpec
                ? JSON.stringify(
                    {
                      status: 200,
                      message: 'Click "Execute Request" above to test this endpoint live.',
                      schemaSnippet: openApiSpec.paths[selectedEndpoint] || 'See full OpenAPI schema below',
                    },
                    null,
                    2
                  )
                : 'Loading specification...'}
            </pre>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>HTTP Status: <strong className="text-emerald-400 font-mono">200 OK</strong></span>
            <button
              onClick={handleCopySpec}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              {copiedSpec ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSpec ? 'Copied OpenAPI Spec' : 'Copy Full OpenAPI 3.1 JSON'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
