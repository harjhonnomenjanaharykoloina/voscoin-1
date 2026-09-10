import React, { useState } from 'react';
import { Workspace } from '../types';
import {
  Sliders,
  Building,
  Key,
  Radio,
  Server,
  Sparkles,
  Save,
  CheckCircle2,
} from 'lucide-react';

interface SettingsViewProps {
  workspace: Workspace;
  onUpdateWorkspace: (updated: Workspace) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  workspace,
  onUpdateWorkspace,
}) => {
  const [name, setName] = useState(workspace.name);
  const [currency, setCurrency] = useState(workspace.currency);
  const [timezone, setTimezone] = useState(workspace.timezone);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWorkspace({
      ...workspace,
      name,
      currency,
      timezone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Sliders className="w-6 h-6 text-indigo-600" />
          <span>Paramètres du Workspace & Intégrations</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configuration des canaux omnicanaux et des identifiants d'API gérés côté serveur NestJS.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Paramètres enregistrés avec succès dans MongoDB !</span>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-600" />
          <span>Informations Générales du Workspace</span>
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nom du Workspace</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 max-w-md gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Devise Principale</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fuseau Horaire</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="UTC">UTC</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les modifications</span>
          </button>
        </form>
      </div>

      {/* Omnichannel Credentials Indicator */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-600" />
          <span>Connecteurs Omnicanaux (Sécurisés Serveur)</span>
        </h2>
        <p className="text-slate-500">
          Ces credentials sont stockés exclusivement dans les variables d'environnement serveur du backend NestJS (<code>backend/.env</code>) et ne sont jamais exposés au navigateur.
        </p>

        <div className="space-y-3 font-mono text-[11px]">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 font-sans block">WhatsApp Cloud API</span>
              <span className="text-slate-500">WHATSAPP_PHONE_NUMBER_ID & WEBHOOK_VERIFY_TOKEN</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans font-semibold text-[10px]">
              Configuré
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 font-sans block">Meta Messenger Webhook</span>
              <span className="text-slate-500">META_MESSENGER_PAGE_TOKEN & VERIFY_TOKEN</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans font-semibold text-[10px]">
              Configuré
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 font-sans block">Email SMTP / Resend Relay</span>
              <span className="text-slate-500">SMTP_HOST: smtp.mailtrap.io (Port 587)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans font-semibold text-[10px]">
              Configuré
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 font-sans block">Moteur IA (OpenAI / Gemini)</span>
              <span className="text-slate-500">OPENAI_API_KEY / GEMINI_API_KEY (Server-side)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-sans font-semibold text-[10px]">
              Actif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
