import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building,
  User,
  Mail,
  Phone,
  Users,
  MessageSquare,
  Zap,
} from 'lucide-react';

export interface DemoFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  teamSize: string;
  primaryGoal: string;
}

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DemoFormData) => void;
  onDirectAccess: () => void;
  isDarkMode?: boolean;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDirectAccess,
  isDarkMode = false,
}) => {
  const [fullName, setFullName] = useState('Alexandre Mercier');
  const [email, setEmail] = useState('alexandre@nexus-corp.com');
  const [phone, setPhone] = useState('+33 6 44 92 10 20');
  const [companyName, setCompanyName] = useState('Nexus Solutions');
  const [teamSize, setTeamSize] = useState('6-20');
  const [primaryGoal, setPrimaryGoal] = useState('sales');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({
        fullName: fullName.trim() || 'Alexandre Mercier',
        email: email.trim() || 'alexandre@nexus-corp.com',
        phone: phone.trim() || '+33 6 44 92 10 20',
        companyName: companyName.trim() || 'Nexus Solutions',
        teamSize,
        primaryGoal,
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className={`relative w-full max-w-xl rounded-2xl border shadow-2xl transition-all my-8 overflow-hidden ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-emerald-950/30'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/20'
        }`}
      >
        {/* Top green WhatsApp accent bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-[#25D366] to-emerald-500 w-full" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>Accès Démo WACRM Immédiat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight pt-1">
              Demandez votre Démo Interactive WACRM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Remplissez ce formulaire pour personnaliser votre session WhatsApp CRM avec vos informations professionnelles.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom complet */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Nom & Prénom *</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex: Alexandre Mercier"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Email Pro */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Email Professionnel *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex: alexandre@entreprise.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Numéro WhatsApp */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Numéro WhatsApp Business *</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 44 92 10 20"
                  className={`w-full pl-3.5 pr-20 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <span className="absolute right-2.5 top-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#25D366]/15 text-emerald-600 dark:text-emerald-400 border border-[#25D366]/30">
                  WhatsApp
                </span>
              </div>
            </div>

            {/* Entreprise */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Entreprise *</span>
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ex: Nexus Solutions"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Taille d'équipe */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Taille de l'équipe commerciale / support</span>
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="1-5">1 à 5 personnes (Solo / Petite équipe)</option>
                <option value="6-20">6 à 20 personnes (Équipe en croissance)</option>
                <option value="21-50">21 à 50 personnes (PME / Scale-up)</option>
                <option value="50+">50+ personnes (Grande entreprise / Agence)</option>
              </select>
            </div>

            {/* Objectif principal */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Cas d'usage prioritaire</span>
              </label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="sales">Ventes & Prospection WhatsApp (Pipeline Kanban)</option>
                <option value="inbox">Boîte de réception d'équipe partagée (Multi-agents)</option>
                <option value="broadcast">Campagnes de diffusion & Relances de masse</option>
                <option value="chatbot">Chatbot IA & Réponses automatiques 24/7</option>
              </select>
            </div>
          </div>

          {/* Quick reassurance points */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Votre espace WACRM est instantanément configuré</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-5.5 text-[10px] leading-tight">
              Connexion WhatsApp Business Cloud API active • Chats d'exemple • Pipeline de vente synchronisé.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm shadow-md shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Configuration de votre démo WACRM en cours...</span>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Lancer mon Espace Démo WACRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onDirectAccess}
              className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Ou explorer directement sans formulaire (Accès Démo Immédiat) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
