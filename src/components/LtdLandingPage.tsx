import React, { useState } from 'react';
import {
  SupportedLanguage,
  ltdTranslations,
  LTDPlan,
} from '../data/ltdTranslations';
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageSquare,
  Kanban,
  Database,
  Radio,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Globe,
  Sun,
  Moon,
  ArrowRight,
  Send,
  Lock,
  CheckCircle2,
  Users,
  Building,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle,
  Award,
  Copy,
  ExternalLink,
  CreditCard,
  FileText,
  Sliders,
  Search,
  Filter,
  Bot,
  Smartphone,
  Mail,
  Share2,
  CheckCheck,
} from 'lucide-react';

interface LtdLandingPageProps {
  onOpenApp: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang: SupportedLanguage;
  onChangeLang: (lang: SupportedLanguage) => void;
}

export const LtdLandingPage: React.FC<LtdLandingPageProps> = ({
  onOpenApp,
  isDarkMode,
  onToggleDarkMode,
  currentLang,
  onChangeLang,
}) => {
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<LTDPlan | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Active module preview tab
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'inbox' | 'kanban' | 'contacts' | 'bullmq' | 'rbac'>('inbox');

  // Checkout modal form state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerVat, setBuyerVat] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sepa' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const t = ltdTranslations[currentLang];

  const handleOpenCheckout = (plan: LTDPlan) => {
    setSelectedPlanForCheckout(plan);
    setGeneratedLicenseKey(null);
    setInvoiceId(null);
    setCopiedKey(false);
  };

  const handleCopyLicenseKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessingCheckout(true);

    setTimeout(() => {
      const planCode = selectedPlanForCheckout.id.toUpperCase();
      const randomHex1 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const randomHex2 = Math.random().toString(16).substring(2, 6).toUpperCase();
      const licenseKey = `NXT-LTD-${planCode}-${randomHex1}-${randomHex2}`;
      const randomInv = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      setInvoiceId(randomInv);
      setGeneratedLicenseKey(licenseKey);
      setIsProcessingCheckout(false);
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-medium">{t.hero.scarcity}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hidden md:inline">✓ {t.hero.guarantee}</span>
            <button
              onClick={() => scrollToSection('pricing')}
              className="font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.claimDeal} →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? 'bg-slate-950/90 border-slate-800/80'
            : 'bg-white/90 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo NextCRM */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-indigo-500/20">
              N
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg">NextCRM</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  LTD 2026
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => scrollToSection('interfaces')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Démonstration 100%
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollToSection('comparison')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.comparison}
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.testimonials}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {t.nav.faq}
            </button>
          </nav>

          {/* Right actions: Language, Dark mode, Launch App CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Changer de langue"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div
                  className={`absolute right-0 mt-1.5 w-36 rounded-xl border shadow-xl py-1 z-50 text-xs font-medium ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <button
                    onClick={() => {
                      onChangeLang('fr');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentLang === 'fr' ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    <span>🇫🇷 Français</span>
                    {currentLang === 'fr' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('en');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentLang === 'en' ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {currentLang === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      onChangeLang('de');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentLang === 'de' ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    <span>🇩🇪 Deutsch</span>
                    {currentLang === 'de' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Activer mode clair' : 'Activer mode sombre'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Launch App Button */}
            <button
              onClick={onOpenApp}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t.nav.openApp}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-16 pb-20 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t.hero.pill}</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            {t.hero.titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-400">
              {t.hero.titleHighlight}
            </span>
            {t.hero.titleEnd}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenApp}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDarkMode
                  ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-500" />
              <span>Tester le CRM en direct (Démo 100%)</span>
            </button>
          </div>

          {/* Trust points below CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{t.hero.noSubscription}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t.hero.guarantee}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Paiement sécurisé SSL 256-bit & Facture Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION VEDETTE : DÉMONSTRATION COMPLÈTE • 100% DES INTERFACES & CAPACITÉS NEXTCRM */}
      <section
        id="interfaces"
        className={`py-20 border-y ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>DÉMONSTRATION INTERACTIVE • 100% DÉBLOQUÉ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Découvrez toutes les interfaces de NextCRM en action
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Une architecture solide et sans compromis : boîte omnicanale unifiée, pipeline Kanban des ventes, intelligence contacts, file asynchrone Redis/BullMQ et permissions RBAC.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveInteractiveTab('inbox')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeInteractiveTab === 'inbox'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>1. Boîte Omnicanale (WhatsApp + Meta + Email)</span>
            </button>

            <button
              onClick={() => setActiveInteractiveTab('kanban')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeInteractiveTab === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <Kanban className="w-4 h-4 text-indigo-400" />
              <span>2. Pipeline Kanban des Ventes</span>
            </button>

            <button
              onClick={() => setActiveInteractiveTab('contacts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeInteractiveTab === 'contacts'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>3. Contacts & Lead Scoring IA</span>
            </button>

            <button
              onClick={() => setActiveInteractiveTab('bullmq')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeInteractiveTab === 'bullmq'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>4. Moteur Asynchrone BullMQ & Redis</span>
            </button>

            <button
              onClick={() => setActiveInteractiveTab('rbac')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeInteractiveTab === 'rbac'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>5. Multi-Tenant & RBAC Granulaire</span>
            </button>
          </div>

          {/* Interactive Interface Frame Container */}
          <div
            className={`rounded-2xl border p-3 shadow-2xl transition-all ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 shadow-indigo-950/40'
                : 'bg-white border-slate-200 shadow-slate-200/80'
            }`}
          >
            {/* Window Header */}
            <div
              className={`px-4 py-3 rounded-t-xl border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-400'
                  : 'bg-slate-100/80 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  app.nextcrm.io/{activeInteractiveTab}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Multi-Tenant MongoDB Isolé
                </span>
                <button
                  onClick={onOpenApp}
                  className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Ouvrir l'application en plein écran</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Tab 1 : Boîte Omnicanale */}
            {activeInteractiveTab === 'inbox' && (
              <div className={`p-6 rounded-b-xl space-y-6 ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/70'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Conversations Sidebar */}
                  <div
                    className={`rounded-xl border p-4 text-xs space-y-3 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
                      <div className="font-bold flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-indigo-500" />
                        <span>Canaux Actifs (3)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 font-bold">
                        12 non lus
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-lg border border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/30 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Thomas Vidal (Solaris Corp)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold">
                            WhatsApp
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                          « Nous validons la proposition pour 120 licences. Quel est le process ? »
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900/60 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Claire Delorme (Fintech Hub)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold">
                            Messenger
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                          « Pouvez-vous nous confirmer la conformité RGPD et l'hébergement EU ? »
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900/60 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Marc Fontaine (Krono Logistics)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-600 font-bold">
                            Email IMAP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                          « Re: Signature bon de commande & déploiement équipe commerciale »
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Active Message Viewer */}
                  <div
                    className={`lg:col-span-2 rounded-xl border p-5 text-xs flex flex-col justify-between ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Contact top info */}
                      <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>Thomas Vidal</span>
                            <span className="text-[10px] font-semibold text-slate-400">• Directeur Commercial @ Solaris Cloud</span>
                          </div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            Canal : WhatsApp Business Cloud API (+33 6 44 92 10 20)
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            Deal actif : 45 000 $
                          </span>
                        </div>
                      </div>

                      {/* Chat messages */}
                      <div className="space-y-3 pt-2">
                        <div className="max-w-md p-3 rounded-xl rounded-tl-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed text-[11px]">
                          Bonjour ! Nous validons la proposition pour les 120 licences de notre équipe commerciale. Pouvez-vous nous transmettre le bon de commande et planifier le paramétrage ?
                        </div>

                        <div className="max-w-md ml-auto p-3 rounded-xl rounded-tr-none bg-indigo-600 text-white leading-relaxed text-[11px]">
                          Bonjour Thomas ! C'est une excellente nouvelle. Tout est prêt, je génère votre contrat et nous configurons vos flux WhatsApp dès cet après-midi.
                        </div>

                        {/* AI Suggestion Chip */}
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-between gap-3 text-[11px]">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-purple-500 shrink-0" />
                            <span>
                              <strong>Suggestion IA :</strong> « Envoyer le lien sécurisé de signature électronique et le calendrier d’onboarding BullMQ »
                            </span>
                          </div>
                          <button
                            onClick={onOpenApp}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-[10px] hover:bg-purple-500 transition-colors shrink-0 cursor-pointer"
                          >
                            Insérer
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Compose bar */}
                    <div className="pt-4 border-t dark:border-slate-800 flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value="Répondre via WhatsApp Cloud API..."
                        className={`w-full px-3 py-2 rounded-lg border text-xs ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      />
                      <button
                        onClick={onOpenApp}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1.5 hover:bg-indigo-500 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Envoyer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2 : Pipeline Kanban des Ventes */}
            {activeInteractiveTab === 'kanban' && (
              <div className={`p-6 rounded-b-xl space-y-4 overflow-x-auto ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/70'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm">Pipeline des Ventes Principal</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Opportunités Actives : 310 000 $ (18 deals)</p>
                  </div>
                  <button
                    onClick={onOpenApp}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Nouveau Deal</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[700px]">
                  {/* Col 1 */}
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
                      <span className="font-bold text-xs">1. Nouveau Lead (4)</span>
                      <span className="text-[10px] font-bold text-slate-400">45 000 $</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Déploiement WhatsApp API</div>
                        <div className="text-[10px] text-slate-500">Fintech Europe • 15 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-600 font-bold">Chaud</span>
                          <span className="text-slate-400">J-2</span>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Migration CRM HubSpot</div>
                        <div className="text-[10px] text-slate-500">Retail Fast • 30 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold">Inbound</span>
                          <span className="text-slate-400">Hier</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
                      <span className="font-bold text-xs">2. Démo Programmée (5)</span>
                      <span className="text-[10px] font-bold text-slate-400">95 000 $</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Licences Equipe Vente</div>
                        <div className="text-[10px] text-slate-500">Nexus Media • 40 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold">Démo Validée</span>
                          <span className="text-slate-400">Demain 14h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
                      <span className="font-bold text-xs">3. Négociation (3)</span>
                      <span className="text-[10px] font-bold text-slate-400">125 000 $</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Solaris Cloud Corp</div>
                        <div className="text-[10px] text-slate-500">120 Licences LTD • 45 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-600 font-bold">Contrat Envoyé</span>
                          <span className="text-emerald-500 font-bold">90% probabilité</span>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Krono Logistics Global</div>
                        <div className="text-[10px] text-slate-500">Multi-Workspace • 80 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold">Revue Juridique</span>
                          <span className="text-emerald-500 font-bold">85% probabilité</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 4 */}
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
                      <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">4. Gagné / Won (6)</span>
                      <span className="text-[10px] font-bold text-emerald-600">145 000 $</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white">Alliance Santé Digitale</div>
                        <div className="text-[10px] text-slate-500">Contrat Annuel • 65 000 $</div>
                        <div className="mt-2 flex items-center justify-between text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold">Signé</span>
                          <span className="text-slate-400">Facturé</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3 : Contacts & Lead Scoring */}
            {activeInteractiveTab === 'contacts' && (
              <div className={`p-6 rounded-b-xl space-y-4 ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/70'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">Annuaire des Contacts & Scoring Prédictif</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Synchronisation bidirectionnelle WhatsApp, Messenger & Email</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      placeholder="Filtrer par entreprise ou tag..."
                      className={`px-3 py-1.5 rounded-lg border text-xs ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    />
                  </div>
                </div>

                <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                      <tr>
                        <th className="py-3 px-4 font-bold">Contact & Rôle</th>
                        <th className="py-3 px-4 font-bold">Entreprise</th>
                        <th className="py-3 px-4 font-bold">Canal Principal</th>
                        <th className="py-3 px-4 font-bold text-center">Score IA</th>
                        <th className="py-3 px-4 font-bold">Dernier Contact</th>
                        <th className="py-3 px-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">Thomas Vidal</div>
                          <div className="text-[10px] text-slate-400">thomas@solariscloud.com</div>
                        </td>
                        <td className="py-3 px-4 font-medium">Solaris Cloud Corp</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                            WhatsApp Cloud
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                            94 / 100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500">Il y a 5 min</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={onOpenApp} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
                            Ouvrir
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">Claire Delorme</div>
                          <div className="text-[10px] text-slate-400">c.delorme@fintechhub.fr</div>
                        </td>
                        <td className="py-3 px-4 font-medium">Fintech Hub France</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-600">
                            Meta Messenger
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                            88 / 100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500">Hier 16:30</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={onOpenApp} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
                            Ouvrir
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">Marc Fontaine</div>
                          <div className="text-[10px] text-slate-400">m.fontaine@krono-logistics.com</div>
                        </td>
                        <td className="py-3 px-4 font-medium">Krono Logistics Group</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-600">
                            Email IMAP
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                            91 / 100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500">Il y a 2h</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={onOpenApp} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
                            Ouvrir
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4 : Moteur Asynchrone BullMQ & Redis */}
            {activeInteractiveTab === 'bullmq' && (
              <div className={`p-6 rounded-b-xl space-y-6 ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/70'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Débit BullMQ Queue</span>
                    <div className="text-xl font-black mt-1 text-emerald-500">1,480 jobs / min</div>
                    <span className="text-[10px] text-slate-500">0 échec • Auto-retry x3</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Latence Redis In-Memory</span>
                    <div className="text-xl font-black mt-1 text-indigo-500">7.8 ms</div>
                    <span className="text-[10px] text-slate-500">Webhooks Meta & WhatsApp instantanés</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Workers Asynchrones</span>
                    <div className="text-xl font-black mt-1 text-purple-500">8 Workers Actifs</div>
                    <span className="text-[10px] text-slate-500">Consommation RAM optimisée (~120MB)</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                    <span>Flux de Travail Actifs dans BullMQ</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-semibold">Nouveau message entrant WhatsApp ➔ Analyse de sentiment IA ➔ Tag automatique</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500">Exécuté en 14ms</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span className="font-semibold">Relance devis non signé à J+2 (Email + WhatsApp) avec lien direct</span>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-500">Planifié (24 en attente)</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span className="font-semibold">Synchronisation des opportunités gagnées vers la facturation & comptabilité</span>
                      </div>
                      <span className="text-[10px] font-bold text-purple-500">Automatique</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5 : RBAC & Multi-Tenant */}
            {activeInteractiveTab === 'rbac' && (
              <div className={`p-6 rounded-b-xl space-y-6 ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/70'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl border text-xs space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="font-bold flex items-center gap-2 pb-2 border-b dark:border-slate-800">
                      <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      <span>Rôles & Niveaux d'Accès</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg border dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Workspace Owner (Propriétaire)</div>
                          <div className="text-[10px] text-slate-500">Contrôle absolu, facturation, API keys et exports totaux</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-500 font-bold">Full Access</span>
                      </div>

                      <div className="p-2.5 rounded-lg border dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Commercial Admin / Manager</div>
                          <div className="text-[10px] text-slate-500">Gestion de l'équipe, réattribution des leads et rapports</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-500 font-bold">Admin</span>
                      </div>

                      <div className="p-2.5 rounded-lg border dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Agent Commercial / Support</div>
                          <div className="text-[10px] text-slate-500">Accès restreint à ses propres contacts et conversations attribuées</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-bold">Agent</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs space-y-3 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="font-bold flex items-center gap-2 pb-2 border-b dark:border-slate-800">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span>Sécurité Multi-Tenant MongoDB</span>
                    </div>
                    <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      <p>
                        • <strong>Isolation stricte des données :</strong> chaque workspace dispose de son index d'isolation exclusif dans Prisma ORM.
                      </p>
                      <p>
                        • <strong>Chiffrement des clés API :</strong> les secrets Meta Cloud API, SMTP et providers IA sont encryptés au repos.
                      </p>
                      <p>
                        • <strong>Conformité RGPD native :</strong> droit à l'oubli en 1 clic, export de données certifié et traçabilité des accès.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={onOpenApp}
                        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors cursor-pointer"
                      >
                        Tester la gestion RBAC dans NextCRM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section
        className={`py-12 border-y ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                {t.stats.stat1Value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {t.stats.stat1Label}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {t.stats.stat2Value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {t.stats.stat2Label}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">
                {t.stats.stat3Value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {t.stats.stat3Label}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400">
                {t.stats.stat4Value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {t.stats.stat4Label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.featuresSection.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.featuresSection.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.featuresSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.featuresSection.items.map((item, idx) => {
            const icons = [
              <MessageSquare className="w-5 h-5 text-emerald-500" key="0" />,
              <Kanban className="w-5 h-5 text-indigo-500" key="1" />,
              <Sparkles className="w-5 h-5 text-purple-500" key="2" />,
              <Radio className="w-5 h-5 text-red-500" key="3" />,
              <ShieldCheck className="w-5 h-5 text-emerald-500" key="4" />,
              <Clock className="w-5 h-5 text-amber-500" key="5" />,
            ];

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all hover:translate-y-[-2px] ${
                  isDarkMode
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  {icons[idx % icons.length]}
                </div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Section (Solo 99$, Pro 149$, Illimité 179$) */}
      <section
        id="pricing"
        className={`py-20 border-y ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.pricingSection.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t.pricingSection.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.pricingSection.subtitle}
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {t.pricingSection.plans.map((plan) => {
              const isPopular = plan.popular;
              const isUnlimited = plan.id === 'unlimited';

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl flex flex-col justify-between transition-all relative ${
                    isPopular
                      ? 'border-2 border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-600/10 ring-4 ring-indigo-600/5'
                      : isUnlimited
                      ? 'border-2 border-purple-600/80 dark:border-purple-500/80 shadow-lg ring-4 ring-purple-600/5'
                      : 'border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                  } ${isDarkMode ? 'bg-slate-900' : 'bg-white'} p-8`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${
                          isPopular ? 'bg-indigo-600' : 'bg-purple-600'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{plan.badge}</span>
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="border-b pb-6 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                          -{(100 - Math.round((plan.price / plan.originalPrice) * 100))}% OFF
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px]">
                        {plan.description}
                      </p>

                      {/* Price & Strike */}
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ${plan.originalPrice}
                        </span>
                        <span className="text-xs font-bold text-slate-500 uppercase ml-1">
                          USD
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2.5 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>
                          {t.pricingSection.oneTimePayment} • {t.pricingSection.lifetimeAccess}
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="py-6 space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Fonctionnalités incluses :
                      </div>
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isPopular
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : isUnlimited
                                ? 'text-purple-600 dark:text-purple-400'
                                : 'text-emerald-500'
                            }`}
                          />
                          <span
                            className={
                              f.includes('UNLIMITED') || f.includes('ILLIMITÉ') || f.includes('UNBEGRENZTE')
                                ? 'font-bold text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-700 dark:text-slate-300'
                            }
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear Call-to-action button */}
                  <div className="pt-4 border-t dark:border-slate-800">
                    <button
                      onClick={() => handleOpenCheckout(plan)}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer ${
                        isPopular
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-600/30 hover:scale-[1.01]'
                          : isUnlimited
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 hover:scale-[1.01]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:scale-[1.01]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="tracking-wide">{plan.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span>Paiement sécurisé SSL • Facture Pro immédiate</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust & Enterprise Guarantee Strip */}
          <div
            className={`p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Paiement 100% Sécurisé</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Chiffrement bancaire SSL 256-bit certifié Stripe & 3D Secure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Facture & TVA Déductible</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Reçu fiscal instantané conforme aux normes comptables B2B.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Mises à Jour à Vie</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Accès garanti à toutes les évolutions majeures de NextCRM.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Garantie 30 Jours</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Remboursement intégral sans poser de question si non satisfait.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.comparison.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.comparison.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.comparison.subtitle}
          </p>
        </div>

        <div
          className={`rounded-2xl border overflow-hidden shadow-xs ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="py-4 px-6 font-bold">Fonctionnalité</th>
                  <th className="py-4 px-6 text-center font-bold">Solo (99$)</th>
                  <th className="py-4 px-6 text-center font-bold text-indigo-600 dark:text-indigo-400">
                    Pro (149$) ★
                  </th>
                  <th className="py-4 px-6 text-center font-bold text-purple-600 dark:text-purple-400">
                    Illimitée (179$)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {t.comparison.features.map((feat, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors ${
                      idx % 2 === 0 ? (isDarkMode ? 'bg-slate-900/20' : 'bg-slate-50/20') : ''
                    }`}
                  >
                    <td className="py-3.5 px-6 font-medium">
                      <div>{feat.name}</div>
                      <div className="text-[10px] text-slate-400">{feat.category}</div>
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {typeof feat.solo === 'boolean' ? (
                        feat.solo ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{feat.solo}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {typeof feat.pro === 'boolean' ? (
                        feat.pro ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{feat.pro}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      {typeof feat.unlimited === 'boolean' ? (
                        feat.unlimited ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-purple-600 dark:text-purple-400">{feat.unlimited}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className={`py-20 border-y ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/60 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t.testimonials.tag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((test, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    « {test.quote} »
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t dark:border-slate-800">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold">{test.author}</div>
                    <div className="text-[11px] text-slate-400">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.faq.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{t.faq.title}</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t pt-3 dark:border-slate-800">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Prêt à libérer votre entreprise des abonnements mensuels ?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Rejoignez plus de 1 200 entreprises qui gèrent leurs ventes omnicanales avec NextCRM à vie.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-950 font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              Obtenir ma Licence à partir de 99$ →
            </button>
            <button
              onClick={onOpenApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-indigo-700 bg-indigo-900/50 hover:bg-indigo-900 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Ouvrir l'application NextCRM
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t text-xs ${
          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              N
            </div>
            <span className="font-bold text-slate-900 dark:text-white">NextCRM</span>
            <span className="text-slate-400">© 2026. {t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">{t.footer.privacy}</span>
            <span className="hover:underline cursor-pointer">{t.footer.terms}</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              {t.footer.status}
            </span>
          </div>
        </div>
      </footer>

      {/* SOPHISTICATED B2B CHECKOUT MODAL (Credit Card / SEPA / Instant License) */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPlanForCheckout(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!generatedLicenseKey ? (
              <>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Commande Sécurisée SSL 256-bit
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">
                    {t.checkoutModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.checkoutModal.subtitle}
                  </p>
                </div>

                {/* Plan Summary Card */}
                <div
                  className={`p-3.5 rounded-xl border mb-4 flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      {t.checkoutModal.selectedPlan}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {selectedPlanForCheckout.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Paiement unique • Mises à jour à vie incluses
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block line-through">
                      ${selectedPlanForCheckout.originalPrice} USD
                    </span>
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                      ${selectedPlanForCheckout.price}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-bold">USD (TTC)</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-4">
                  <label className="text-xs font-semibold block mb-1.5">Moyen de règlement sécurisé</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          : isDarkMode
                          ? 'border-slate-800 bg-slate-950 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Carte Bancaire</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                        paymentMethod === 'apple_pay'
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          : isDarkMode
                          ? 'border-slate-800 bg-slate-950 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Apple / Google Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('sepa')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                        paymentMethod === 'sepa'
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                          : isDarkMode
                          ? 'border-slate-800 bg-slate-950 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Virement SEPA Pro</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleConfirmCheckout} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">
                        {t.checkoutModal.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alexandre Dumont"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">
                        {t.checkoutModal.emailLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alexandre@votre-societe.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">
                        {t.checkoutModal.workspaceNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Global SAS"
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">
                        Numéro de TVA Intracommunautaire (optionnel)
                      </label>
                      <input
                        type="text"
                        placeholder="FR 32 849 201 940"
                        value={buyerVat}
                        onChange={(e) => setBuyerVat(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card Details (when card is chosen) */}
                  {paymentMethod === 'card' && (
                    <div className={`p-3 rounded-xl border space-y-2 ${isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div>
                        <label className="font-semibold block mb-1 text-[11px]">Numéro de Carte Bancaire</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs ${
                              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] font-bold text-slate-400">VISA / MC</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-semibold block mb-1 text-[11px]">Expiration (MM/AA)</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs ${
                              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1 text-[11px]">Code CVC</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs ${
                              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Processing banner */}
                  {isProcessingCheckout && (
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 space-y-1.5 animate-pulse">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Zap className="w-3.5 h-3.5 animate-spin" />
                        <span>Validation sécurisée Stripe & Attribution de votre licence NextCRM...</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 flex items-center justify-end gap-2 border-t dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setSelectedPlanForCheckout(null)}
                      className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                    >
                      {t.checkoutModal.closeBtn}
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessingCheckout}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                    >
                      {isProcessingCheckout ? (
                        <span>Traitement en cours...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Régler ${selectedPlanForCheckout.price} USD & Activer</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success / Key activation screen */
              <div className="text-center py-4 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {t.checkoutModal.successTitle}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Votre paiement a été validé. Votre facture officielle et votre accès à vie sont prêts.
                  </p>
                </div>

                {/* Professional Receipt */}
                <div
                  className={`p-4 rounded-xl border text-left font-mono text-xs space-y-2.5 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-400">Facture N° :</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{invoiceId}</span>
                  </div>

                  <div className="border-t pt-2 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-sans mb-1">
                      {t.checkoutModal.licenseKeyLabel}
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                        {generatedLicenseKey}
                      </div>
                      <button
                        onClick={() => handleCopyLicenseKey(generatedLicenseKey || '')}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-sans font-bold flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copiedKey ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-sans pt-1 flex items-center justify-between">
                    <span>Formule : {selectedPlanForCheckout.name} (${selectedPlanForCheckout.price})</span>
                    <span>Workspace : {buyerCompany || 'Apex Global'}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedPlanForCheckout(null);
                      onOpenApp();
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.checkoutModal.launchAppBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-slate-400">
                    Un reçu complet et une copie de la clé ont été envoyés à {buyerEmail || 'votre adresse email'}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
