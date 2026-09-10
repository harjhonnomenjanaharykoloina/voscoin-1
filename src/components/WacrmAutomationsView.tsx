import React, { useState } from 'react';
import {
  Bot,
  Zap,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Clock,
  MessageSquare,
  Power,
  Sliders,
  Send,
} from 'lucide-react';

interface AutoRule {
  id: string;
  keyword: string;
  matchType: 'EXACT' | 'CONTAINS';
  replyText: string;
  isActive: boolean;
  triggerCount: number;
}

interface WacrmAutomationsViewProps {
  isDarkMode?: boolean;
}

export const WacrmAutomationsView: React.FC<WacrmAutomationsViewProps> = ({
  isDarkMode = false,
}) => {
  const [rules, setRules] = useState<AutoRule[]>([
    {
      id: 'r_01',
      keyword: 'PRIX',
      matchType: 'CONTAINS',
      replyText:
        '👋 Bonjour ! Voici notre grille tarifaire officielle WACRM : Solo (99$), Pro (149$), Unlimited (179$) en paiement unique à vie sans abonnement.',
      isActive: true,
      triggerCount: 342,
    },
    {
      id: 'r_02',
      keyword: 'DEMO',
      matchType: 'CONTAINS',
      replyText:
        '🎯 Avec grand plaisir ! Vous pouvez réserver votre créneau de démo interactive en direct ici : https://wacrm.io/demo-live',
      isActive: true,
      triggerCount: 189,
    },
    {
      id: 'r_03',
      keyword: 'DEVIS',
      matchType: 'CONTAINS',
      replyText:
        '📄 Merci pour votre demande. Un commercial dédié prépare votre devis sous 30 minutes. Pouvez-vous préciser le nombre d’utilisateurs souhaité ?',
      isActive: true,
      triggerCount: 96,
    },
    {
      id: 'r_04',
      keyword: 'HORAIRES',
      matchType: 'CONTAINS',
      replyText:
        '🕒 Notre équipe commerciale vous répond du lundi au vendredi de 8h30 à 19h00 (heure de Paris). En dehors de ces heures, nos robots IA restent actifs !',
      isActive: false,
      triggerCount: 54,
    },
  ]);

  const [aiAutoReplyEnabled, setAiAutoReplyEnabled] = useState(true);
  const [welcomeMessageEnabled, setWelcomeMessageEnabled] = useState(true);
  const [welcomeText, setWelcomeText] = useState(
    'Bienvenue chez Nexus ! Un conseiller va prendre en charge votre message WhatsApp d’ici quelques instants. En quoi pouvons-nous vous aider ?',
  );

  const [newKeyword, setNewKeyword] = useState('');
  const [newReply, setNewReply] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newReply.trim()) return;

    const newRule: AutoRule = {
      id: `r_${Date.now()}`,
      keyword: newKeyword.trim().toUpperCase(),
      matchType: 'CONTAINS',
      replyText: newReply.trim(),
      isActive: true,
      triggerCount: 0,
    };

    setRules([newRule, ...rules]);
    setNewKeyword('');
    setNewReply('');
    setShowAddModal(false);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#008069] dark:text-[#25D366] border border-[#25D366]/30">
              ● Moteur de Réponses Automatiques
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-[#00a884]" />
            <span>Chatbot & Automatisations WhatsApp</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configurez les déclencheurs par mots-clés, le message d'accueil et le répondeur intelligent IA.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Mot-Clé Déclencheur</span>
        </button>
      </div>

      {/* Two Pillars: AI Responder & Welcome Message */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* IA Smart Auto-Reply */}
        <div
          className={`rounded-2xl p-5 border transition-all ${
            isDarkMode
              ? 'bg-[#111b21] border-[#202c33] text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Répondeur Intelligent IA (Gemini)</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Génère des réponses contextuelles instantanées
                </p>
              </div>
            </div>

            <button
              onClick={() => setAiAutoReplyEnabled(!aiAutoReplyEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                aiAutoReplyEnabled
                  ? 'bg-[#25D366] text-slate-950 shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {aiAutoReplyEnabled ? 'ACTIF' : 'INACTIF'}
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            Lorsque vos conseillers sont hors-ligne ou occupés, l'IA analyse les messages WhatsApp entrants et formule une proposition de réponse précise en français, anglais ou allemand.
          </p>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-200">
            <span className="font-bold block mb-1">Délai de réponse : &lt; 1,2 seconde</span>
            <span>Taux de satisfaction client mesuré : 94,8%</span>
          </div>
        </div>

        {/* Message d'accueil WhatsApp */}
        <div
          className={`rounded-2xl p-5 border transition-all ${
            isDarkMode
              ? 'bg-[#111b21] border-[#202c33] text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-[#00a884] dark:text-[#25D366] flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Message d'Accueil Immédiat</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Envoyé dès le premier message d'un prospect
                </p>
              </div>
            </div>

            <button
              onClick={() => setWelcomeMessageEnabled(!welcomeMessageEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                welcomeMessageEnabled
                  ? 'bg-[#25D366] text-slate-950 shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {welcomeMessageEnabled ? 'ACTIF' : 'INACTIF'}
            </button>
          </div>

          <textarea
            rows={3}
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            disabled={!welcomeMessageEnabled}
            className={`w-full p-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-[#00a884] disabled:opacity-50 ${
              isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
            }`}
          />
        </div>
      </div>

      {/* Keywords Trigger Table */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDarkMode
            ? 'bg-[#111b21] border-[#202c33] text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
        }`}
      >
        <div className="p-4 border-b dark:border-[#202c33] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Règles par Mots-Clés Actives</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Détecte les mots-clés dans les messages WhatsApp entrants et renvoie instantanément la réponse configurée.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#00a884] dark:text-[#25D366]">
            {rules.filter((r) => r.isActive).length} règles actives
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-[#202c33]">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#202c33]/40 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    #{rule.keyword}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Contient le mot-clé • Déclenché {rule.triggerCount} fois
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rule.replyText}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    rule.isActive
                      ? 'bg-[#25D366]/20 text-[#008069] dark:text-[#25D366]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {rule.isActive ? 'Actif' : 'En pause'}
                </button>

                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Supprimer la règle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Keyword Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <h3 className="font-bold text-sm">Ajouter une règle de mot-clé WhatsApp</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Mot-clé détecté (ex: BROCHURE, SUPPORT, RDV) *</label>
                <input
                  type="text"
                  required
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="ex: BROCHURE"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Message de réponse automatique WhatsApp *</label>
                <textarea
                  rows={4}
                  required
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Tapez le texte qui sera envoyé immédiatement au client..."
                  className={`w-full p-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold shadow-sm cursor-pointer"
                >
                  Activer la règle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
