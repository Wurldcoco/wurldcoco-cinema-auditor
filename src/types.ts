/**
 * Types and Pydantic-equivalent schemas for Wurldcoco AI
 * Agentic IP and Cultural Rights Auditor for Modern Screenwriting
 */

export type RiskLevel = 'SAFE' | 'CAUTION' | 'HIGH_RISK' | 'CRITICAL';

export type ProductionPhase = 'Development' | 'Pre-production' | 'Shooting' | 'Post-production';

export type ScriptType = 'Treatment' | 'Dialogue Script' | 'Production Log' | 'Character Bible';

export interface ScriptPayload {
  title: string;
  logline: string;
  screenplayText: string;
  genre: string;
  indigenousMotifsReferenced: string[];
  originCultures: string[];
  targetTerritory: string;
  productionPhase: ProductionPhase;
  scriptType: ScriptType;
}

export interface LineMarker {
  lineNumber?: number;
  excerpt: string;
  category: 'Sacred Taboo' | 'Linguistic Distort' | 'Copyright Conflict' | 'Misappropriation' | 'Stereotype' | 'Ethical Compliant';
  severity: 'low' | 'medium' | 'high' | 'critical';
  critique: string;
  suggestedRewrite: string;
  customaryProtocolRef?: string;
}

export interface CulturalMotifAnalysis {
  motif: string;
  originCulture: string;
  custodianCommunity: string;
  sacredStatus: 'Sacred / Secret' | 'Restricted / Initiatic' | 'Communal Custody' | 'Custodial / Communal' | 'Public Cultural Domain';
  misappropriationRisk: RiskLevel;
  customaryLawNotes: string;
  communityConsentRequired: boolean;
  clearanceProtocol: string;
}

export interface RegistryMatch {
  databaseName: 'WIPO TCE' | 'UNESCO ICH' | 'US Copyright Office' | 'NZ Māori TKI' | 'Australian ICIP' | 'GIDA CARE';
  registryId: string;
  title: string;
  originCommunity: string;
  status: 'Registered TCE' | 'Protected Cultural Heritage' | 'Commercial Copyright Active' | 'Public Domain with Moral Rights' | 'Custodial Restriction';
  riskFactor: string;
  tlsBypassed: boolean;
  registryUrl: string;
}

export interface RemediationRecommendation {
  id: string;
  phase: 'Immediate Pre-Shoot' | 'Writers Room Revision' | 'Community Protocol' | 'Legal Contracting';
  title: string;
  actionRequired: string;
  communityConsultationContact: string;
  benefitSharingGuidance: string;
}

export interface ReasoningStep {
  agentRole: 'Pydantic Validator' | 'curl_cffi TLS Scraper' | 'Gemini 2.5 Contextual Reasoner' | 'WIPO Legal Auditor' | 'Ethics & Customary Arbiter';
  timestamp: string;
  observation: string;
  deduction: string;
}

export interface AuditReport {
  id: string;
  timestamp: string;
  screenplayTitle: string;
  productionPhase: ProductionPhase;
  scriptType: ScriptType;
  overallScore: number; // 0 (Severe Risk) to 100 (Fully Cleared)
  clearanceVerdict: 'CLEARED FOR PRODUCTION' | 'CONDITIONAL CLEARANCE' | 'HIGH RISK - REVISE' | 'HALT - DIRECT VIOLATION';
  summaryAssessment: string;
  indigenousRightsRisk: RiskLevel;
  copyrightInfringementRisk: RiskLevel;
  sacredKnowledgeRisk: RiskLevel;
  commercialMisappropriationRisk: RiskLevel;
  motifsIdentified: CulturalMotifAnalysis[];
  problematicLines: LineMarker[];
  registryVerifications: RegistryMatch[];
  remediationPlan: RemediationRecommendation[];
  agenticReasoningTrace: ReasoningStep[];
  auditedBy: string;
  executionDurationMs: number;
}

export interface FolkloreMotifRecord {
  id: string;
  name: string;
  culture: string;
  region: string;
  summary: string;
  sacredVsPublic: 'Sacred / Secret' | 'Restricted / Initiatic' | 'Communal Custody' | 'General Folklore';
  customaryLaw: string;
  wipoClassification: string;
  filmmakingDoAndDont: {
    do: string[];
    dont: string[];
  };
  samplePermittedUsage: string;
}

export interface TlsScraperLog {
  id: string;
  timestamp: string;
  targetEndpoint: string;
  impersonationProfile: 'chrome_124' | 'safari_17' | 'firefox_120';
  tlsJa3Hash: string;
  tlsJa4Hash: string;
  httpVersion: 'HTTP/2' | 'HTTP/3';
  status: number;
  recordsExtracted: number;
  latencyMs: number;
}
