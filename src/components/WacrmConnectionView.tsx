import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  Smartphone,
  Server,
  RefreshCw,
  Zap,
  ShieldCheck,
  Send,
  Lock,
  Copy,
  Check,
} from 'lucide-react';

interface WacrmConnectionViewProps {
  isDarkMode?: boolean;
}

export const WacrmConnectionView: React.FC<WacrmConnectionViewProps> = ({
  isDarkMode = false,
}) => {
  const [connectionMode, setConnectionMode] = useState<'CLOUD_API' | 'WEB_QR'>('CLOUD_API');
  const [isCopied, setIsCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [testNumber, setTestNumber] = useState('+33 6 44 92 10 20');
  const [testSent, setTestSent] = useState(false);

  const webhookUrl = 'https://api.wacrm.io/v1/webhooks/whatsapp/nexus-corp';

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#008069] dark:text-[#25D366] border border-[#25D366]/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>Session WhatsApp Active</span>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <QrCode className="w-6 h-6 text-[#00a884]" />
            <span>Passerelle & Connexion WhatsApp</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gérez votre liaison WhatsApp Business via l'API Cloud officielle Meta ou le mode QR Multi-device.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#202c33] text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Vérifier la connexion</span>
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex p-1 rounded-xl bg-slate-200/80 dark:bg-[#111b21] max-w-md">
        <button
          onClick={() => setConnectionMode('CLOUD_API')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            connectionMode === 'CLOUD_API'
              ? 'bg-white dark:bg-[#00a884] text-slate-900 dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>API Cloud Officielle Meta</span>
        </button>

        <button
          onClick={() => setConnectionMode('WEB_QR')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            connectionMode === 'WEB_QR'
              ? 'bg-white dark:bg-[#00a884] text-slate-900 dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>QR Multi-Device Web</span>
        </button>
      </div>

      {connectionMode === 'CLOUD_API' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Credentials & Status */}
          <div
            className={`lg:col-span-2 rounded-2xl p-6 border space-y-5 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b dark:border-[#202c33]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#00a884] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">WhatsApp Business Cloud API (Meta)</h3>
                  <p className="text-[11px] text-emerald-600 dark:text-[#25D366] font-semibold">
                    ● Connecté & Opérationnel • Latence 85ms
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Tier 3 (Illimité)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202c33] border border-slate-200 dark:border-[#2a3942]">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Numéro de téléphone vérifié
                </div>
                <div className="font-mono font-bold text-sm">+33 6 44 92 10 20</div>
                <div className="text-[10px] text-slate-500 mt-1">Badge Entreprise Vérifié vert</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#202c33] border border-slate-200 dark:border-[#2a3942]">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Identifiant Phone Number ID
                </div>
                <div className="font-mono font-bold text-sm">104928374910283</div>
                <div className="text-[10px] text-slate-500 mt-1">WhatsApp Cloud Platform Meta</div>
              </div>
            </div>

            {/* Webhook endpoint */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                URL de Webhook WACRM (Événements & Messages entrants)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookUrl}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-[#202c33] border border-slate-200 dark:border-[#2a3942] text-slate-700 dark:text-slate-300"
                />
                <button
                  onClick={handleCopyWebhook}
                  className="px-3 py-2 rounded-xl bg-[#00a884] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copié' : 'Copier'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Message Ping */}
          <div
            className={`rounded-2xl p-6 border space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
            }`}
          >
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Send className="w-4 h-4 text-[#00a884]" />
              <span>Tester la Passerelle WhatsApp</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Envoyez un message ping de test pour confirmer la bonne réception sur votre smartphone.
            </p>

            <form onSubmit={handleSendTest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Numéro récepteur</label>
                <input
                  type="text"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border font-mono text-xs ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Envoyer un Ping de Test</span>
              </button>

              {testSent && (
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Message WhatsApp test envoyé avec succès !</span>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        /* QR Code multi-device view */
        <div
          className={`rounded-2xl p-8 border text-center max-w-xl mx-auto space-y-4 ${
            isDarkMode
              ? 'bg-[#111b21] border-[#202c33] text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
          }`}
        >
          <div className="w-56 h-56 mx-auto bg-white p-4 rounded-2xl border-2 border-[#00a884] shadow-md flex items-center justify-center">
            {/* Simulated QR Code SVG representation */}
            <div className="w-full h-full border-4 border-slate-900 p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-10 h-10 bg-slate-900 rounded-sm" />
                <div className="w-10 h-10 bg-slate-900 rounded-sm" />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-slate-950" />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-10 h-10 bg-slate-900 rounded-sm" />
                <div className="w-6 h-6 bg-slate-900 rounded-sm self-end" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-base">Scannez ce QR Code avec WhatsApp</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ouvrez WhatsApp sur votre téléphone ➔ Menu ➔ Appareils connectés ➔ Connecter un appareil.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
            <span>Session multi-appareils WACRM prête à être synchronisée</span>
          </div>
        </div>
      )}
    </div>
  );
};
