import React, { useState } from 'react';
import { Campaign, ChannelType, Workspace } from '../types';
import {
  Send,
  Plus,
  Radio,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  BarChart3,
  MessageSquare,
  Sparkles,
  CheckCheck,
} from 'lucide-react';

interface CampaignsViewProps {
  campaigns: Campaign[];
  workspace: Workspace;
  onCreateCampaign: (newCampaign: Omit<Campaign, 'id' | 'workspaceId' | 'sentCount' | 'deliveredCount' | 'readCount' | 'failedCount'>) => void;
  isDarkMode?: boolean;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  workspace,
  onCreateCampaign,
  isDarkMode = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [channel, setChannel] = useState<ChannelType>('WHATSAPP');
  const [scheduledDate, setScheduledDate] = useState('2026-09-15');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onCreateCampaign({
      name,
      channel,
      status: 'SCHEDULED',
      scheduledDate,
    });

    setName('');
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#008069] dark:text-[#25D366] border border-[#25D366]/30">
              ● Diffusions WhatsApp Broadcast
            </span>
            <span className="text-xs text-slate-500">
              Taux d'ouverture moyen : <strong className="text-emerald-600 dark:text-emerald-400 font-mono">94,2%</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Send className="w-6 h-6 text-[#00a884]" />
            <span>Diffusions & Campagnes WACRM</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Envoyez des messages ciblés à vos listes de contacts avec les modèles WhatsApp approuvés par Meta.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Créer une Diffusion WhatsApp</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const totalSent = camp.sentCount;
          const deliveryRate = totalSent > 0 ? Math.round((camp.deliveredCount / totalSent) * 100) : 98;
          const readRate = totalSent > 0 ? Math.round((camp.readCount / totalSent) * 100) : 89;

          return (
            <div
              key={camp.id}
              className={`rounded-2xl border p-5 transition-all space-y-4 flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>WhatsApp Broadcast</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      camp.status === 'RUNNING'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : camp.status === 'COMPLETED'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {camp.status === 'RUNNING' ? 'En cours' : camp.status === 'COMPLETED' ? 'Terminé' : 'Programmé'}
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-snug">{camp.name}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Programmé pour : {camp.scheduledDate}</span>
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t dark:border-[#202c33]">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#202c33]">
                    <div className="text-[10px] text-slate-400 font-medium">Taux Délivré</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono">
                      {deliveryRate}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#202c33]">
                    <div className="text-[10px] text-slate-400 font-medium">Taux Lecture (✓✓)</div>
                    <div className="text-sm font-bold text-[#00a884] dark:text-[#25D366] font-mono">
                      {readRate}%
                    </div>
                  </div>
                </div>

                <div className="text-[11px] flex justify-between text-slate-500 dark:text-slate-400 font-mono">
                  <span>Envoyés : {camp.sentCount.toLocaleString()}</span>
                  <span>Lus : {camp.readCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal create */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <h3 className="font-bold text-sm">Nouvelle Campagne de Diffusion WhatsApp</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Nom de la campagne *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Relance Promotions Q4"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Date d'envoi</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold shadow-sm cursor-pointer"
                >
                  Planifier la Diffusion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
