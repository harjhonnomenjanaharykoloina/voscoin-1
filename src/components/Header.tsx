import React from 'react';
import { Workspace, User, UserRole } from '../types';
import {
  Building2,
  ChevronDown,
  ShieldCheck,
  Server,
  Database,
  Radio,
  Bell,
  Sparkles,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';

interface HeaderProps {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  onSelectWorkspace: (ws: Workspace) => void;
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  onOpenFoundation: () => void;
  onOpenLtd: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  workspaces,
  currentWorkspace,
  onSelectWorkspace,
  currentUser,
  onRoleChange,
  onOpenFoundation,
  onOpenLtd,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const roleBadges: Record<UserRole, { label: string; bg: string; text: string }> = {
    OWNER: { label: 'Owner', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-700' },
    ADMIN: { label: 'Admin', bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'text-blue-700' },
    MANAGER: { label: 'Manager', bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-700' },
    AGENT: { label: 'Agent', bg: 'bg-slate-100 text-slate-700 border-slate-200', text: 'text-slate-700' },
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Brand & Workspace Switcher */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            N
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-slate-900 text-lg">NextCRM</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Phase 2 Core
              </span>
            </div>
          </div>
        </div>

        {/* Tenant Boundary Indicator & Workspace Selector */}
        <div className="relative group">
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 text-sm">
            <Building2 className="w-4 h-4 text-slate-500" />
            <select
              value={currentWorkspace.id}
              onChange={(e) => {
                const found = workspaces.find((w) => w.id === e.target.value);
                if (found) onSelectWorkspace(found);
              }}
              className="bg-transparent font-medium text-slate-800 text-sm focus:outline-none cursor-pointer pr-4 hover:text-indigo-600 transition-colors"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name} ({ws.currency})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Middle: Live Stack Health Pills */}
      <div className="hidden lg:flex items-center gap-2 text-xs">
        <button
          onClick={onOpenFoundation}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
          title="Inspect NestJS Architecture & Foundation"
        >
          <Server className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-medium">NestJS Backend</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>

        <button
          onClick={onOpenFoundation}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
          title="Inspect MongoDB + Prisma Schema"
        >
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">MongoDB / Prisma</span>
        </button>

        <button
          onClick={onOpenFoundation}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
          title="Inspect Redis + BullMQ Queue Engine"
        >
          <Radio className="w-3.5 h-3.5 text-red-500" />
          <span className="font-medium">Redis / BullMQ</span>
        </button>
      </div>

      {/* Right: RBAC switcher & User Profile */}
      <div className="flex items-center gap-4">
        {/* Role Switcher for RBAC simulation */}
        <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Role:</span>
          <select
            value={currentUser.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="OWNER">Owner (Full access)</option>
            <option value="ADMIN">Admin (Ops & config)</option>
            <option value="MANAGER">Manager (Team lead)</option>
            <option value="AGENT">Agent (Frontline)</option>
          </select>
        </div>

        {/* LTD Offer Button */}
        <button
          onClick={onOpenLtd}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-md shadow-xs transition-all cursor-pointer border border-amber-400/30"
          title="Consulter la Landing Page LTD (Licences à vie)"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
          <span>Offre LTD (dès 99$)</span>
        </button>

        {/* Foundation Shortcut Button */}
        <button
          onClick={onOpenFoundation}
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Stack</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer transition-colors"
          title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User avatar & name */}
        <div className="flex items-center gap-2.5 pl-2">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="hidden xl:block text-left text-xs">
            <div className="font-semibold text-slate-800 leading-tight">{currentUser.name}</div>
            <div className="text-slate-500 text-[11px]">{currentUser.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
