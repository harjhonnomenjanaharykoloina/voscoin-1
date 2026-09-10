import React, { useState } from 'react';
import { Deal, Workspace } from '../types';
import {
  Kanban,
  Plus,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Building,
  User,
  Calendar,
  MessageSquare,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PipelineViewProps {
  deals: Deal[];
  workspace: Workspace;
  onUpdateDealStage: (dealId: string, newStage: Deal['stage']) => void;
  onCreateDeal: (newDeal: Omit<Deal, 'id' | 'workspaceId'>) => void;
  onOpenWhatsApp?: (contactName: string) => void;
  isDarkMode?: boolean;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  deals,
  workspace,
  onUpdateDealStage,
  onCreateDeal,
  onOpenWhatsApp,
  isDarkMode = false,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('25000');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [stage, setStage] = useState<Deal['stage']>('LEAD');

  const stages: { id: Deal['stage']; label: string; color: string; badgeBg: string }[] = [
    { id: 'LEAD', label: '1. Lead Inbound', color: 'border-t-slate-400', badgeBg: 'bg-slate-500' },
    { id: 'CONTACTED', label: '2. Contacté WhatsApp', color: 'border-t-blue-500', badgeBg: 'bg-blue-500' },
    { id: 'MEETING', label: '3. Démo Planifiée', color: 'border-t-purple-500', badgeBg: 'bg-purple-500' },
    { id: 'PROPOSAL', label: '4. Devis Envoyé', color: 'border-t-amber-500', badgeBg: 'bg-amber-500' },
    { id: 'NEGOTIATION', label: '5. Négociation WA', color: 'border-t-cyan-500', badgeBg: 'bg-cyan-500' },
    { id: 'WON', label: '6. Gagné (Won) 🎉', color: 'border-t-[#25D366]', badgeBg: 'bg-[#25D366]' },
  ];

  const totalValue = deals
    .filter((d) => d.stage !== 'LOST')
    .reduce((sum, d) => sum + d.amount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName) return;

    onCreateDeal({
      title,
      amount: parseFloat(amount) || 0,
      companyName,
      contactName: contactName || 'Contact Inconnu',
      stage,
      probability: stage === 'WON' ? 100 : stage === 'NEGOTIATION' ? 90 : 50,
      expectedCloseDate: '2026-10-31',
    });

    setTitle('');
    setCompanyName('');
    setContactName('');
    setShowCreateModal(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#008069] dark:text-[#25D366] border border-[#25D366]/30">
              ● Pipeline WhatsApp Sync
            </span>
            <span className="text-xs text-slate-500">
              Total actif : <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{totalValue.toLocaleString()} €</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Kanban className="w-6 h-6 text-[#00a884]" />
            <span>Pipeline de Vente WACRM</span>
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Deal WhatsApp</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {stages.map((stg) => {
          const stageDeals = deals.filter((d) => d.stage === stg.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={stg.id}
              className={`rounded-2xl p-3 flex flex-col min-w-[220px] border-t-4 transition-colors ${stg.color} ${
                isDarkMode
                  ? 'bg-[#111b21] border-x border-b border-[#202c33]'
                  : 'bg-white border-x border-b border-slate-200 shadow-2xs'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b dark:border-[#202c33]">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">{stg.label}</h3>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {stageTotal.toLocaleString()} € • {stageDeals.length}
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${stg.badgeBg}`} />
              </div>

              {/* Deal Cards */}
              <div className="space-y-2.5 flex-1">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className={`rounded-xl p-3 border transition-all hover:border-[#00a884] group ${
                      isDarkMode
                        ? 'bg-[#202c33] border-[#2a3942] text-slate-100'
                        : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <h4 className="text-xs font-bold leading-tight group-hover:text-[#00a884] transition-colors">
                        {deal.title}
                      </h4>
                    </div>

                    <div className="text-sm font-extrabold text-[#00a884] dark:text-[#25D366] font-mono mb-2">
                      {deal.amount.toLocaleString()} €
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <Building className="w-3 h-3 shrink-0" />
                        <span className="truncate">{deal.companyName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="w-3 h-3 shrink-0" />
                        <span className="truncate">{deal.contactName}</span>
                      </div>
                    </div>

                    {/* Direct 1-Click WhatsApp Chat Action */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-[#2a3942] flex items-center justify-between gap-1">
                      <button
                        onClick={() => onOpenWhatsApp && onOpenWhatsApp(deal.contactName)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#008069] dark:text-[#25D366] font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        title="Ouvrir le chat WhatsApp direct"
                      >
                        <MessageSquare className="w-3 h-3 fill-current" />
                        <span>Chat WhatsApp</span>
                      </button>

                      {/* Advance Stage button */}
                      {stg.id !== 'WON' && (
                        <button
                          onClick={() => {
                            const nextStageIndex = stages.findIndex((s) => s.id === stg.id) + 1;
                            if (nextStageIndex < stages.length) {
                              onUpdateDealStage(deal.id, stages[nextStageIndex].id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-[#111b21] text-slate-500 cursor-pointer"
                          title="Avancer à l'étape suivante"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="p-4 text-center text-[10px] text-slate-400 border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                    Aucun deal
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Deal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <h3 className="font-bold text-sm">Nouvelle Opportunité Commerciale</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Nom de l'opportunité *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex: Déploiement WhatsApp Commerce"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Montant estimé (€) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                      isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Étape initiale</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as Deal['stage'])}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] cursor-pointer ${
                      isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {stages.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Entreprise *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ex: Retail Pro SA"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Contact WhatsApp lié</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ex: Claire Fontaine"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold shadow-sm cursor-pointer"
                >
                  Créer l'opportunité
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
