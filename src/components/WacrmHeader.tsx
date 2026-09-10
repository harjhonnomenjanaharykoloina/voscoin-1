import React, { useState } from 'react';
import { Workspace, User, UserRole } from '../types';
import {
  MessageSquare,
  Search,
  Plus,
  ShieldCheck,
  Sun,
  Moon,
  Zap,
  PhoneCall,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface WacrmHeaderProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  onSelectWorkspace: (ws: Workspace) => void;
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  onOpenLtd: () => void;
  onRequestDemo: () => void;
  onOpenDirectWhatsApp: (phone: string, text: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const WacrmHeader: React.FC<WacrmHeaderProps> = ({
  workspaces,
  currentWorkspace,
  onSelectWorkspace,
  currentUser,
  onRoleChange,
  onOpenLtd,
  onRequestDemo,
  onOpenDirectWhatsApp,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [targetPhone, setTargetPhone] = useState('+33 6 ');
  const [initialMessage, setInitialMessage] = useState('Bonjour ! Suite à votre intérêt pour notre solution, voici notre lien...');

  const handleStartDirectChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPhone.trim()) return;
    onOpenDirectWhatsApp(targetPhone.trim(), initialMessage.trim());
    setIsNewChatModalOpen(false);
  };

  return (
    <>
      <header
        className={`h-16 px-4 sm:px-6 border-b flex items-center justify-between sticky top-0 z-30 transition-colors ${
          isDarkMode
            ? 'bg-[#111b21] border-[#202c33] text-slate-100'
            : 'bg-[#008069] border-[#006a57] text-white shadow-xs'
        }`}
      >
        {/* Left: WACRM Brand & Live WhatsApp Connection Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-[#25D366]/20">
              <MessageSquare className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg text-white">
                  WACRM
                </span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-white/20 text-white tracking-wide">
                  WA Cloud
                </span>
              </div>
            </div>
          </div>

          {/* Connection Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/20 border border-white/10 text-white/90">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="text-[11px] font-mono">+33 6 44 92 10 20</span>
            <span className="text-white/40">•</span>
            <span className="text-[11px] text-[#25D366] font-bold">API Officielle Connectée</span>
          </div>
        </div>

        {/* Center: Quick action to start direct WhatsApp */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all cursor-pointer border border-white/10 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau Message WhatsApp</span>
          </button>
        </div>

        {/* Right: Actions, Demo Request, LTD offer, Theme, User */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Demo Request Button */}
          <button
            onClick={onRequestDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#008069] hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
            title="Ouvrir le formulaire de demande de démo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Demande de Démo</span>
          </button>

          {/* LTD Deal Button */}
          <button
            onClick={onOpenLtd}
            className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg shadow-xs transition-all cursor-pointer"
            title="Consulter l'offre LTD à vie"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden md:inline">Offre LTD</span>
            <span>(99$)</span>
          </button>

          {/* Role selector */}
          <div className="hidden xl:flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg border border-white/10 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
            <select
              value={currentUser.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="OWNER" className="text-slate-900">Owner (Admin)</option>
              <option value="AGENT" className="text-slate-900">Agent WhatsApp</option>
              <option value="MANAGER" className="text-slate-900">Manager Ventes</option>
            </select>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white cursor-pointer transition-colors"
            title={isDarkMode ? 'Mode clair' : 'Mode sombre WhatsApp'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-white/20">
            <div className="relative">
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#111b21]"></span>
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <div className="font-bold text-white">{currentUser.name}</div>
              <div className="text-[10px] text-white/70">Agent En ligne</div>
            </div>
          </div>
        </div>
      </header>

      {/* Direct WhatsApp Message Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] text-slate-950 flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Démarrer une discussion WhatsApp</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Envoi instantané sans enregistrer le contact
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStartDirectChat} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Numéro WhatsApp du destinataire</label>
                <input
                  type="text"
                  required
                  value={targetPhone}
                  onChange={(e) => setTargetPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#25D366] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Message d'ouverture</label>
                <textarea
                  rows={3}
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder="Tapez le premier message..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#25D366] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer sur WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
