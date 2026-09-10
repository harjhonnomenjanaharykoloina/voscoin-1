import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Building,
  Kanban,
  CheckSquare,
  Send,
  ShieldAlert,
  Sliders,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';

export type NavTab =
  | 'ltd'
  | 'dashboard'
  | 'inbox'
  | 'contacts'
  | 'companies'
  | 'pipeline'
  | 'tasks'
  | 'campaigns'
  | 'team'
  | 'foundation'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadInboxCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadInboxCount,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'inbox' as NavTab,
      label: 'Inbox (Omnicanal)',
      icon: MessageSquare,
      badge: unreadInboxCount > 0 ? unreadInboxCount : undefined,
    },
    { id: 'contacts' as NavTab, label: 'Contacts', icon: Users },
    { id: 'companies' as NavTab, label: 'Companies', icon: Building },
    { id: 'pipeline' as NavTab, label: 'Deals & Pipeline', icon: Kanban },
    { id: 'tasks' as NavTab, label: 'Tasks & Planning', icon: CheckSquare },
    { id: 'campaigns' as NavTab, label: 'Campaigns', icon: Send },
    { id: 'team' as NavTab, label: 'Team & RBAC', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      {/* Workspace Quick Banner */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Navigation CRM
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
          v2.0 (NestJS)
        </span>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {/* Special LTD Promotion Link */}
        <button
          onClick={() => onSelectTab('ltd')}
          className={`w-full mb-3 flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentTab === 'ltd'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-amber-300 bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Zap className={`w-4 h-4 ${currentTab === 'ltd' ? 'text-slate-950 fill-slate-950' : 'text-amber-400 fill-amber-400'}`} />
            <span>Offre LTD (dès 99$)</span>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-black tracking-wider ${
            currentTab === 'ltd' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
          }`}>
            À VIE
          </span>
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 pb-2 px-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Architecture & Config
          </span>
        </div>

        <button
          onClick={() => onSelectTab('foundation')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            currentTab === 'foundation'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-indigo-300 bg-indigo-950/30 border border-indigo-800/40 hover:bg-indigo-900/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Phase 2 Foundation</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-mono">
            Stack
          </span>
        </button>

        <button
          onClick={() => onSelectTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            currentTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
          }`}
        >
          <Sliders className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Backend Infrastructure Status Widget */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>Infra Stack</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
          <div className="flex justify-between">
            <span className="text-slate-500">API:</span>
            <span className="text-indigo-400">NestJS v10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">DB:</span>
            <span className="text-emerald-400">MongoDB + Prisma</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Queue:</span>
            <span className="text-red-400">Redis + BullMQ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Channels:</span>
            <span className="text-emerald-400">WA / Meta / SMTP</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
