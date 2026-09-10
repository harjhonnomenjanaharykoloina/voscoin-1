import React from 'react';
import {
  MessageSquare,
  Kanban,
  Send,
  Users,
  Bot,
  QrCode,
  Sliders,
  Zap,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export type WacrmTab =
  | 'ltd'
  | 'inbox'
  | 'pipeline'
  | 'campaigns'
  | 'contacts'
  | 'automations'
  | 'connection'
  | 'settings';

interface WacrmSidebarProps {
  currentTab: WacrmTab;
  onSelectTab: (tab: WacrmTab) => void;
  unreadInboxCount: number;
  isDarkMode?: boolean;
}

export const WacrmSidebar: React.FC<WacrmSidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadInboxCount,
  isDarkMode = false,
}) => {
  const mainNav = [
    {
      id: 'inbox' as WacrmTab,
      label: 'WhatsApp Chats',
      subtitle: 'Discussions en direct',
      icon: MessageSquare,
      badge: unreadInboxCount > 0 ? unreadInboxCount : undefined,
    },
    {
      id: 'pipeline' as WacrmTab,
      label: 'Pipeline Ventes',
      subtitle: 'Kanban des deals',
      icon: Kanban,
    },
    {
      id: 'campaigns' as WacrmTab,
      label: 'Diffusions & Campagnes',
      subtitle: 'Envois de masse WhatsApp',
      icon: Send,
    },
    {
      id: 'contacts' as WacrmTab,
      label: 'Contacts & Labels',
      subtitle: 'Annuaire & Segments',
      icon: Users,
    },
    {
      id: 'automations' as WacrmTab,
      label: 'Chatbot & IA',
      subtitle: 'Mots-clés & Auto-réponses',
      icon: Bot,
    },
    {
      id: 'connection' as WacrmTab,
      label: 'Connexion WhatsApp',
      subtitle: 'QR Multi-device & API',
      icon: QrCode,
    },
  ];

  return (
    <aside
      className={`w-64 flex flex-col shrink-0 border-r transition-colors ${
        isDarkMode
          ? 'bg-[#111b21] border-[#202c33] text-slate-300'
          : 'bg-[#f0f2f5] border-slate-200 text-slate-700'
      }`}
    >
      {/* Quick LTD Banner */}
      <div className="p-3">
        <button
          onClick={() => onSelectTab('ltd')}
          className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
            currentTab === 'ltd'
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
              : isDarkMode
              ? 'bg-amber-950/40 text-amber-300 border-amber-500/30 hover:bg-amber-900/40'
              : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 fill-current text-amber-500" />
            <div>
              <div className="font-extrabold text-[12px] leading-tight">Licence à Vie LTD</div>
              <div className="text-[10px] opacity-80">Accès illimité dès 99$</div>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-black bg-amber-500 text-slate-950">
            PROMO
          </span>
        </button>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Cockpit WACRM
        </div>

        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                isActive
                  ? isDarkMode
                    ? 'bg-[#00a884] text-slate-950 shadow-sm'
                    : 'bg-[#008069] text-white shadow-xs'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-[#202c33] hover:text-white'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? isDarkMode
                        ? 'text-slate-950'
                        : 'text-white'
                      : 'text-slate-400'
                  }`}
                />
                <div className="truncate">
                  <div className="leading-tight">{item.label}</div>
                  <div
                    className={`text-[10px] font-normal truncate ${
                      isActive
                        ? isDarkMode
                          ? 'text-slate-800'
                          : 'text-white/80'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-black rounded-full ${
                    isActive
                      ? 'bg-white text-slate-950'
                      : 'bg-[#25D366] text-slate-950 font-bold'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-3 px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Configuration
        </div>

        <button
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentTab === 'settings'
              ? isDarkMode
                ? 'bg-[#00a884] text-slate-950'
                : 'bg-[#008069] text-white'
              : isDarkMode
              ? 'text-slate-300 hover:bg-[#202c33]'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          <Sliders className="w-4 h-4 text-slate-400" />
          <span>Paramètres WACRM</span>
        </button>
      </nav>

      {/* WhatsApp Connection status widget */}
      <div className="p-3 m-3 rounded-xl border text-xs space-y-1.5 transition-colors bg-white/60 dark:bg-[#182229] border-slate-200 dark:border-[#202c33]">
        <div className="flex items-center justify-between font-bold text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="text-emerald-700 dark:text-emerald-400">WhatsApp Actif</span>
          </div>
          <span className="text-[10px] px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
            Meta API
          </span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
          Session synchronisée multi-agents avec réponses instantanées.
        </p>
      </div>
    </aside>
  );
};
