import React from 'react';
import { Workspace, Deal, Contact, Conversation, Task } from '../types';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Award,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DashboardViewProps {
  workspace: Workspace;
  deals: Deal[];
  contacts: Contact[];
  conversations: Conversation[];
  tasks: Task[];
  onNavigate: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  workspace,
  deals,
  contacts,
  conversations,
  tasks,
  onNavigate,
}) => {
  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'LOST')
    .reduce((sum, d) => sum + d.amount, 0);

  const wonDealsValue = deals
    .filter((d) => d.stage === 'WON')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner: Workspace Context & Phase 2 Foundation Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● Phase 2 Foundation Active
            </span>
            <span className="text-xs text-slate-400">Workspace: {workspace.name}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            NextCRM Executive Command Center
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Architecture unifiée : NestJS REST API, MongoDB avec Prisma ORM, Redis & BullMQ pour les files omnicanales (WhatsApp, Messenger, Email).
          </p>
        </div>

        <button
          onClick={() => onNavigate('foundation')}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer border border-indigo-400/30"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Inspecter l’Architecture NestJS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pipeline Value */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Valeur Pipeline</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {workspace.currency === 'EUR' ? '€' : '$'}
            {totalPipelineValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs mois précédent</span>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Contacts Qualifiés</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{contacts.length}</div>
          <div className="text-xs text-slate-500 mt-2">
            Isolés par tenant ({workspace.slug})
          </div>
        </div>

        {/* Omnichannel Messages */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Conversations Actives</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {conversations.length}
            {totalUnreadMessages > 0 && (
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {totalUnreadMessages} non lus
              </span>
            )}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-2">
            WhatsApp & Messenger connectés
          </div>
        </div>

        {/* Closed Won */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Revenu Signé (Won)</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {workspace.currency === 'EUR' ? '€' : '$'}
            {wonDealsValue.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {deals.filter((d) => d.stage === 'WON').length} opportunités clôturées
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline Snapshot & Omnichannel Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Pipeline Opportunities */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Opportunités Majeures</h2>
              <p className="text-xs text-slate-500">Deals en cours dans le pipeline de vente</p>
            </div>
            <button
              onClick={() => onNavigate('pipeline')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Voir le Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {deals.slice(0, 5).map((deal) => {
              const stageColors: Record<string, string> = {
                LEAD: 'bg-slate-100 text-slate-700',
                CONTACTED: 'bg-blue-100 text-blue-700',
                MEETING: 'bg-purple-100 text-purple-700',
                PROPOSAL: 'bg-amber-100 text-amber-800',
                NEGOTIATION: 'bg-cyan-100 text-cyan-800',
                WON: 'bg-emerald-100 text-emerald-800',
                LOST: 'bg-rose-100 text-rose-800',
              };

              return (
                <div key={deal.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{deal.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{deal.companyName}</span>
                      <span>•</span>
                      <span>{deal.contactName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${stageColors[deal.stage] || 'bg-slate-100'}`}>
                      {deal.stage}
                    </span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {workspace.currency === 'EUR' ? '€' : '$'}
                        {deal.amount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400">{deal.probability}% prob.</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Omnichannel Channel Status & Pending Tasks */}
        <div className="space-y-6">
          {/* Omnichannel Health */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Canaux Omnicanaux</h3>
            <p className="text-xs text-slate-500 mb-4">Statuts des connecteurs NestJS / BullMQ</p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-slate-700">WhatsApp Cloud API</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Connecté
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-slate-700">Meta Messenger Webhook</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Actif
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-slate-700">Relais SMTP / Email</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Opérationnel
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="font-semibold text-slate-700">Moteur IA (Suggestions)</span>
                </div>
                <span className="text-[11px] font-medium text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  Prêt
                </span>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Tâches Prioritaires</h3>
              <span className="text-xs text-slate-500">{pendingTasks} en attente</span>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-slate-800 leading-snug">
                      {task.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        task.priority === 'URGENT'
                          ? 'bg-rose-100 text-rose-700'
                          : task.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
