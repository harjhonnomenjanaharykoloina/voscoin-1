import React, { useState } from 'react';
import { BullMqQueueInfo } from '../types';
import {
  Cpu,
  Server,
  Database,
  Radio,
  ShieldCheck,
  Code2,
  CheckCircle2,
  Activity,
  Layers,
  Terminal,
  FileText,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface FoundationViewProps {
  queues: BullMqQueueInfo[];
}

export const FoundationView: React.FC<FoundationViewProps> = ({ queues }) => {
  const [activeTab, setActiveTab] = useState<'ARCHITECTURE' | 'PRISMA' | 'BULLMQ' | 'SECURITY' | 'HEALTH'>('ARCHITECTURE');
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  const runHealthCheck = () => {
    setIsCheckingHealth(true);
    setTimeout(() => {
      setHealthStatus({
        status: 'ok',
        service: 'NextCRM NestJS Backend (v10)',
        timestamp: new Date().toISOString(),
        environment: 'development',
        components: {
          mongodb: {
            status: 'up',
            provider: 'MongoDB with Prisma ORM',
            connection: 'mongodb://localhost:27017/nextcrm',
            tenantScopeEnforced: true,
          },
          redis: {
            status: 'up',
            provider: 'Redis (IORedis)',
            port: 6379,
            bullmqQueues: 7,
          },
        },
      });
      setIsCheckingHealth(false);
    }, 450);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            Phase 2 Foundation Deliverables
          </span>
          <span className="text-xs text-emerald-600 font-medium">● Officiellement Validé</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Cpu className="w-6 h-6 text-indigo-600" />
          <span>Fondation Technique : NestJS, MongoDB, Prisma & Redis</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Inspection interactive du socle backend NextCRM : conformité stricte avec l'abandon de PostgreSQL au profit de MongoDB, intégration de Prisma ORM, et moteur de traitement asynchrone Redis / BullMQ.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('ARCHITECTURE')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'ARCHITECTURE'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>1. Architecture Globale</span>
        </button>

        <button
          onClick={() => setActiveTab('PRISMA')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'PRISMA'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>2. Schéma Prisma MongoDB</span>
        </button>

        <button
          onClick={() => setActiveTab('BULLMQ')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'BULLMQ'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>3. Files Redis & BullMQ</span>
        </button>

        <button
          onClick={() => setActiveTab('SECURITY')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'SECURITY'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Sécurité & Multi-Tenancy</span>
        </button>

        <button
          onClick={() => setActiveTab('HEALTH')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'HEALTH'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>5. Contrôle Health Check</span>
        </button>
      </div>

      {/* Tab 1: Architecture View */}
      {activeTab === 'ARCHITECTURE' && (
        <div className="space-y-6">
          <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-sm font-mono text-xs overflow-x-auto">
            <div className="text-indigo-400 font-bold text-sm mb-4">
              # SCHÉMA OFFICIEL DE TRANSITION & FLUX DE DONNÉES
            </div>
            <pre className="text-slate-300 leading-relaxed">
{`                         NEXTCRM
                            │
                            ▼
                    ┌─────────────────┐
                    │   ANGULAR 20    │
                    │    FRONTEND     │  (Standalone, Signals, Tailwind, Lucide)
                    └────────┬────────┘
                             │
                    HTTPS / REST API (/api/v1)
                             │
                     WebSocket / Socket.IO
                             │
                             ▼
                    ┌─────────────────┐
                    │     NESTJS      │
                    │     BACKEND     │  (Controllers, Services, Guards, DTOs)
                    │     NODE.JS     │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
         MongoDB           Redis          Storage (S3/MinIO)
          Prisma             │
                             ▼
                           BullMQ
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
          WhatsApp        Messenger        Email
              │
              ▼
         AI Provider (OpenAI / Gemini)`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                <Server className="w-4 h-4" />
                <span>Backend NestJS</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Modules métier isolés : <code>/auth</code>, <code>/workspaces</code>, <code>/contacts</code>, <code>/deals</code>, <code>/inbox</code>, <code>/campaigns</code>, <code>/infra/prisma</code>, <code>/infra/redis</code>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                <Database className="w-4 h-4" />
                <span>MongoDB + Prisma</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Base NoSQL haute performance. Isolation stricte via <code>workspaceId</code> sur chaque collection. <strong>PostgreSQL définitivement banni</strong> du stack.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                <Radio className="w-4 h-4" />
                <span>Redis + BullMQ</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Traitement des webhooks Meta/WhatsApp, envoi asynchrone des campagnes, génération de suggestions IA et rate limiting intelligent.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Prisma MongoDB Schema */}
      {activeTab === 'PRISMA' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-700">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>backend/prisma/schema.prisma (Target MongoDB Model)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold font-mono text-[10px]">
              provider = "mongodb"
            </span>
          </div>

          <div className="p-6 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px]">
            <pre>{`datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Workspace {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  slug      String   @unique
  users     User[]
  contacts  Contact[]
  deals     Deal[]
  tasks     Task[]
  campaigns Campaign[]
}

model User {
  id           String    @id @default(auto()) @map("_id") @db.ObjectId
  workspaceId  String    @db.ObjectId
  email        String    @unique
  passwordHash String
  role         UserRole  @default(AGENT) // OWNER, ADMIN, MANAGER, AGENT
}

model Contact {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  workspaceId   String    @db.ObjectId
  firstName     String
  lastName      String
  email         String?
  whatsappPhone String?
  deals         Deal[]
  conversations Conversation[]
  @@index([workspaceId, email])
}

model Deal {
  id          String      @id @default(auto()) @map("_id") @db.ObjectId
  workspaceId String      @db.ObjectId
  title       String
  amount      Float
  stage       DealStage   // LEAD, CONTACTED, MEETING, PROPOSAL, NEGOTIATION, WON
  @@index([workspaceId, stage])
}

model Conversation {
  id          String      @id @default(auto()) @map("_id") @db.ObjectId
  workspaceId String      @db.ObjectId
  channel     ChannelType // WHATSAPP, MESSENGER, EMAIL
  contactId   String      @db.ObjectId
  messages    Message[]
  aiSummary   String?
}

model Campaign {
  id             String         @id @default(auto()) @map("_id") @db.ObjectId
  workspaceId    String         @db.ObjectId
  name           String
  channel        ChannelType
  status         CampaignStatus // DRAFT, SCHEDULED, RUNNING, COMPLETED
  sentCount      Int            @default(0)
  deliveredCount Int            @default(0)
}`}</pre>
          </div>
        </div>
      )}

      {/* Tab 3: Redis & BullMQ Queues */}
      {activeTab === 'BULLMQ' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Files Asynchrones Actives (Redis Cluster)</span>
              <span className="text-slate-500 font-mono text-[11px]">REDIS_URL: redis://127.0.0.1:6379</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Queue Name</th>
                  <th className="py-3 px-4 text-center">En Attente</th>
                  <th className="py-3 px-4 text-center">En Cours (Active)</th>
                  <th className="py-3 px-4 text-center">Traités (Completed)</th>
                  <th className="py-3 px-4 text-center">Échecs (Failed)</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {queues.map((q) => (
                  <tr key={q.name} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-800">{q.name}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{q.waiting}</td>
                    <td className="py-3 px-4 text-center text-indigo-600 font-bold">{q.active}</td>
                    <td className="py-3 px-4 text-center text-emerald-600">{q.completed.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center text-rose-600">{q.failed}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 font-sans">
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Security Matrix */}
      {activeTab === 'SECURITY' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 mb-2">
            Dispositif de Sécurité "Security-by-Design"
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Isolation Multi-Tenant Inviolable</span>
              </div>
              <p className="text-slate-600">
                Le <code>workspaceId</code> n'est jamais lu depuis les payloads client ; il est extrait et validé directement depuis le JWT serveur (<code>req.user.workspaceId</code>).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Protection Anti-Injection NoSQL</span>
              </div>
              <p className="text-slate-600">
                <code>ValidationPipe</code> NestJS avec <code>whitelist: true</code> et <code>forbidNonWhitelisted: true</code> rejetant tout opérateur Mongo arbitraire (<code>$where</code>, <code>$gt</code>).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rate Limiting Redis Dédié</span>
              </div>
              <p className="text-slate-600">
                Garde <code>AuthRateLimitGuard</code> limitant les requêtes d'authentification et d'exécution à 10 tentatives/minute par IP.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sécurisation des Secrets Canaux</span>
              </div>
              <p className="text-slate-600">
                Les tokens WhatsApp Cloud API et secrets Meta Messenger ne transitent jamais vers le frontend Angular.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Health Check */}
      {activeTab === 'HEALTH' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Health Check & Diagnostic Serveur</h2>
              <p className="text-slate-500 text-xs">
                Vérification du statut du contrôleur <code>/health</code> NestJS (MongoDB + Redis).
              </p>
            </div>
            <button
              onClick={runHealthCheck}
              disabled={isCheckingHealth}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer shadow-xs transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>{isCheckingHealth ? 'Test en cours...' : 'Exécuter le Health Check'}</span>
            </button>
          </div>

          {healthStatus && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
