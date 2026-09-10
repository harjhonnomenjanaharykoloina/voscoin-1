import React from 'react';
import { User, UserRole, Workspace } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Check,
  X,
  Key,
  Lock,
} from 'lucide-react';

interface TeamRbacViewProps {
  users: User[];
  workspace: Workspace;
  currentUserRole: UserRole;
}

export const TeamRbacView: React.FC<TeamRbacViewProps> = ({
  users,
  workspace,
  currentUserRole,
}) => {
  const permissionsMatrix = [
    { module: 'Contacts', action: 'contacts.read', owner: true, admin: true, manager: true, agent: true },
    { module: 'Contacts', action: 'contacts.create', owner: true, admin: true, manager: true, agent: true },
    { module: 'Contacts', action: 'contacts.update', owner: true, admin: true, manager: true, agent: true },
    { module: 'Contacts', action: 'contacts.delete', owner: true, admin: true, manager: true, agent: false },
    { module: 'Deals & Pipeline', action: 'deals.read', owner: true, admin: true, manager: true, agent: true },
    { module: 'Deals & Pipeline', action: 'deals.create', owner: true, admin: true, manager: true, agent: true },
    { module: 'Deals & Pipeline', action: 'deals.update', owner: true, admin: true, manager: true, agent: true },
    { module: 'Deals & Pipeline', action: 'deals.delete', owner: true, admin: true, manager: false, agent: false },
    { module: 'Omnichannel Inbox', action: 'messages.read', owner: true, admin: true, manager: true, agent: true },
    { module: 'Omnichannel Inbox', action: 'messages.send', owner: true, admin: true, manager: true, agent: true },
    { module: 'Campaigns', action: 'campaigns.read', owner: true, admin: true, manager: true, agent: false },
    { module: 'Campaigns', action: 'campaigns.create', owner: true, admin: true, manager: false, agent: false },
    { module: 'Campaigns', action: 'campaigns.send', owner: true, admin: true, manager: false, agent: false },
    { module: 'Team & RBAC', action: 'team.read', owner: true, admin: true, manager: true, agent: false },
    { module: 'Team & RBAC', action: 'team.manage', owner: true, admin: true, manager: false, agent: false },
    { module: 'Settings & Secrets', action: 'settings.read', owner: true, admin: true, manager: false, agent: false },
    { module: 'Settings & Secrets', action: 'settings.manage', owner: true, admin: false, manager: false, agent: false },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            NestJS RBAC & Multi-Tenancy Guard
          </span>
          <span className="text-xs text-slate-400">Workspace : {workspace.name}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-indigo-600" />
          <span>Gestion des Utilisateurs & Matrice RBAC</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Contrôle d'accès basé sur les rôles (Owner, Admin, Manager, Agent) avec vérification systématique côté serveur NestJS.
        </p>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <span>Membres du Workspace ({users.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3.5"
            >
              <img
                src={u.avatarUrl}
                alt={u.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-800 truncate">{u.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{u.email}</div>
                <span className="inline-block mt-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-100 text-indigo-800">
                  {u.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Matrice de Permissions Granulaires</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Vérifiée côté NestJS via `@Roles()` decorator et `RolesGuard`.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4 font-mono">Permission Key</th>
                <th className="py-3 px-4 text-center">Owner</th>
                <th className="py-3 px-4 text-center">Admin</th>
                <th className="py-3 px-4 text-center">Manager</th>
                <th className="py-3 px-4 text-center">Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">{p.module}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-indigo-600">{p.action}</td>
                  <td className="py-3 px-4 text-center">
                    {p.owner ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.admin ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.manager ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.agent ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
