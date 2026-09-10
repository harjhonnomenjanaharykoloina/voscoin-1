import React, { useState, useEffect } from 'react';
import { Conversation, ChannelType, Message } from '../types';
import {
  MessageSquare,
  Send,
  Sparkles,
  Search,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Play,
  Pause,
  RefreshCw,
  Tag,
  DollarSign,
  User,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bot,
  Zap,
  PanelRightClose,
  PanelRightOpen,
  Filter,
} from 'lucide-react';

interface InboxViewProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onSimulateInbound: (conversationId: string, channel: ChannelType) => void;
  isDarkMode?: boolean;
  targetContactName?: string | null;
}

export const InboxView: React.FC<InboxViewProps> = ({
  conversations,
  onSendMessage,
  onSimulateInbound,
  isDarkMode = false,
  targetContactName = null,
}) => {
  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0]?.id || '',
  );

  useEffect(() => {
    if (targetContactName) {
      const match = conversations.find(
        (c) =>
          c.contactName.toLowerCase().includes(targetContactName.toLowerCase()) ||
          targetContactName.toLowerCase().includes(c.contactName.toLowerCase()),
      );
      if (match) {
        setActiveConversationId(match.id);
      }
    }
  }, [targetContactName, conversations]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'UNREAD' | 'DEALS' | 'VIP'>('ALL');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1x' | '1.5x' | '2x'>('1x');

  // Contact quick CRM state for active conversation
  const [contactLabels, setContactLabels] = useState<Record<string, string[]>>({
    conv_01: ['🔥 Prospect Chaud', 'Devis 85k€', 'VIP'],
    conv_02: ['Demande Démo', 'Retail'],
    conv_03: ['Technique', 'Partenaire'],
  });

  const [contactStages, setContactStages] = useState<Record<string, string>>({
    conv_01: 'PROPOSAL',
    conv_02: 'MEETING',
    conv_03: 'QUALIFIED',
  });

  const [contactDeals, setContactDeals] = useState<Record<string, number>>({
    conv_01: 85000,
    conv_02: 64000,
    conv_03: 120000,
  });

  const [contactNotes, setContactNotes] = useState<Record<string, string>>({
    conv_01: 'Validation juridique reçue ce matin. En attente de signature électronique du bon de commande.',
    conv_02: 'Souhaite automatiser les relances paniers abandonnés via WhatsApp Business.',
    conv_03: 'Équipe technique intéressée par la scalabilité et les webhooks en temps réel.',
  });

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessageText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.channelIdentifier.includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterType === 'UNREAD') return c.unreadCount > 0;
    if (filterType === 'DEALS') return (contactDeals[c.id] || 0) > 0;
    if (filterType === 'VIP') return contactLabels[c.id]?.includes('VIP');

    return true;
  });

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const quickMacros = [
    {
      code: '/prix',
      label: 'Grille Tarifaire',
      text: 'Voici notre offre spéciale WACRM : Solo (99$), Pro (149$) et Unlimited (179$) sans abonnement mensuel.',
    },
    {
      code: '/devis',
      label: 'Envoi Devis',
      text: 'Votre devis personnalisé a été généré. Puis-je vous l’adresser directement par WhatsApp en PDF ?',
    },
    {
      code: '/demo',
      label: 'Lien Démo',
      text: 'Je vous invite à choisir un créneau de 15 minutes ici pour une démonstration live personnalisée : https://wacrm.io/demo',
    },
    {
      code: '/relance',
      label: 'Relance Douce',
      text: 'Bonjour ! Je me permets de revenir vers vous pour savoir si vous aviez pu examiner les éléments transmis hier.',
    },
  ];

  return (
    <div
      className={`h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden select-none transition-colors ${
        isDarkMode ? 'bg-[#0b141a] text-slate-100' : 'bg-[#efeae2] text-slate-900'
      }`}
    >
      {/* 1. Left Column: WhatsApp Chats List */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r flex flex-col h-full shrink-0 transition-colors ${
          isDarkMode
            ? 'bg-[#111b21] border-[#202c33]'
            : 'bg-white border-[#e9edef]'
        }`}
      >
        {/* Chats Header */}
        <div className={`p-3.5 border-b ${isDarkMode ? 'bg-[#202c33] border-[#222e35]' : 'bg-[#f0f2f5] border-[#e9edef]'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                WA
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">Discussions WhatsApp</h1>
                <p className="text-[10px] text-[#00a884] font-semibold">● Session connectée</p>
              </div>
            </div>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-emerald-600 dark:text-[#25D366] font-extrabold border border-[#25D366]/30">
              WACRM Live
            </span>
          </div>

          {/* Search Input */}
          <div className="relative mb-2.5">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher ou démarrer une discussion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a884] transition-colors ${
                isDarkMode
                  ? 'bg-[#111b21] text-white border border-[#2a3942] placeholder-slate-500'
                  : 'bg-white text-slate-900 border border-slate-200 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Fast Filter Pills */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[11px] font-semibold">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'ALL'
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-[#111b21] text-slate-400 hover:text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tous ({conversations.length})
            </button>
            <button
              onClick={() => setFilterType('UNREAD')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'UNREAD'
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-[#111b21] text-slate-400 hover:text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Non lus
            </button>
            <button
              onClick={() => setFilterType('DEALS')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'DEALS'
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-[#111b21] text-slate-400 hover:text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Deals Chauds
            </button>
            <button
              onClick={() => setFilterType('VIP')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'VIP'
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-[#111b21] text-slate-400 hover:text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              VIP
            </button>
          </div>
        </div>

        {/* Conversation List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#202c33]">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConv?.id;
            const labels = contactLabels[conv.id] || [];
            const dealVal = contactDeals[conv.id];

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`p-3 cursor-pointer transition-all ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-[#2a3942] border-l-4 border-[#00a884]'
                      : 'bg-[#f0f2f5] border-l-4 border-[#00a884]'
                    : isDarkMode
                    ? 'hover:bg-[#202c33]/70 border-l-4 border-transparent'
                    : 'hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* WhatsApp Profile Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={
                        conv.contactAvatar ||
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={conv.contactName}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white dark:border-[#111b21]"></span>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {conv.contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">
                        {conv.lastMessageAt}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0" />
                      <span className="truncate">{conv.lastMessageText}</span>
                    </p>

                    {/* Labels & Badges */}
                    <div className="flex items-center justify-between mt-1.5 gap-1">
                      <div className="flex items-center gap-1 overflow-hidden">
                        {dealVal && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                            {dealVal.toLocaleString()} €
                          </span>
                        )}
                        {labels.slice(0, 1).map((lbl, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate"
                          >
                            {lbl}
                          </span>
                        ))}
                      </div>

                      {conv.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#25D366] text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Aucune conversation trouvée.
            </div>
          )}
        </div>
      </div>

      {/* 2. Center Column: WhatsApp Chat Stream */}
      {activeConv ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Top WhatsApp Chat Navbar */}
          <div
            className={`h-16 px-4 border-b flex items-center justify-between shrink-0 transition-colors ${
              isDarkMode
                ? 'bg-[#202c33] border-[#222e35] text-slate-100'
                : 'bg-[#f0f2f5] border-[#e9edef] text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    activeConv.contactAvatar ||
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={activeConv.contactName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-white dark:border-[#202c33]"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold leading-tight">{activeConv.contactName}</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#25D366]/20 text-[#00a884] dark:text-[#25D366]">
                    WhatsApp Vérifié
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {activeConv.channelIdentifier} • <span className="text-[#25D366] font-semibold">En ligne</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onSimulateInbound(activeConv.id, 'WHATSAPP')}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#008069] dark:text-[#25D366] transition-colors cursor-pointer"
                title="Simuler un message WhatsApp entrant du client"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simuler Réponse Client</span>
              </button>

              <button
                onClick={() => setIsSideDrawerOpen(!isSideDrawerOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isSideDrawerOpen
                    ? 'bg-[#00a884] text-white'
                    : isDarkMode
                    ? 'hover:bg-[#111b21] text-slate-400'
                    : 'hover:bg-slate-200 text-slate-600'
                }`}
                title={isSideDrawerOpen ? 'Masquer fiche CRM' : 'Afficher fiche CRM'}
              >
                {isSideDrawerOpen ? (
                  <PanelRightClose className="w-4 h-4" />
                ) : (
                  <PanelRightOpen className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Chat Canvas */}
          <div
            className={`flex-1 p-4 md:p-6 overflow-y-auto space-y-3.5 transition-colors ${
              isDarkMode ? 'bg-[#0b141a]' : 'bg-[#efeae2]'
            }`}
          >
            {/* Date divider */}
            <div className="flex justify-center my-2">
              <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-black/10 dark:bg-white/10 text-slate-600 dark:text-slate-300 shadow-2xs">
                Aujourd'hui
              </span>
            </div>

            {/* Messages */}
            {activeConv.messages.map((msg) => {
              const isOutbound = msg.direction === 'OUTBOUND';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isOutbound ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md sm:max-w-lg rounded-2xl px-3.5 py-2 text-xs shadow-xs relative ${
                      isOutbound
                        ? isDarkMode
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                        : isDarkMode
                        ? 'bg-[#202c33] text-white rounded-tl-none border border-[#2a3942]'
                        : 'bg-white text-slate-900 rounded-tl-none shadow-2xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isOutbound && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Audio note simulation */}
            <div className="flex flex-col items-start">
              <div
                className={`max-w-xs rounded-2xl p-3 text-xs shadow-xs rounded-tl-none border ${
                  isDarkMode
                    ? 'bg-[#202c33] border-[#2a3942] text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-[#00a884] transition-all duration-300 ${
                          isPlayingAudio ? 'w-3/4 animate-pulse' : 'w-1/4'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{isPlayingAudio ? '0:18' : '0:26'}</span>
                      <button
                        onClick={() =>
                          setAudioSpeed(
                            audioSpeed === '1x' ? '1.5x' : audioSpeed === '1.5x' ? '2x' : '1x',
                          )
                        }
                        className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-bold"
                      >
                        {audioSpeed}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
                  <span>Note vocale WhatsApp reçue</span>
                  <span>18:05</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Macros & AI Suggestion Bar */}
          <div
            className={`border-t px-4 py-2 flex flex-col gap-1.5 shrink-0 ${
              isDarkMode ? 'bg-[#111b21] border-[#202c33]' : 'bg-[#f0f2f5] border-[#e9edef]'
            }`}
          >
            {/* AI Assistant Pill */}
            <div className="flex items-center gap-2 text-xs overflow-x-auto">
              <Bot className="w-3.5 h-3.5 text-[#00a884] shrink-0" />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
                IA WACRM :
              </span>
              <button
                onClick={() =>
                  setInputText(
                    'Merci pour votre validation ! Je prépare le bon de commande et vous l’adresse d’ici 30 minutes.',
                  )
                }
                className="px-2.5 py-1 rounded-md text-[11px] font-medium truncate cursor-pointer bg-white dark:bg-[#202c33] border border-slate-200 dark:border-[#2a3942] hover:border-[#00a884] text-slate-700 dark:text-slate-200"
              >
                « Merci pour votre validation ! Je prépare le bon de commande... »
              </button>
            </div>

            {/* Quick response macros */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[10px]">
              <span className="text-slate-400 font-bold shrink-0">Modèles :</span>
              {quickMacros.map((macro) => (
                <button
                  key={macro.code}
                  onClick={() => setInputText(macro.text)}
                  className="px-2 py-0.5 rounded-full border border-slate-300 dark:border-[#2a3942] hover:bg-white dark:hover:bg-[#202c33] text-slate-600 dark:text-slate-300 font-semibold cursor-pointer shrink-0 transition-colors"
                  title={macro.text}
                >
                  {macro.code} • {macro.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Compose Form */}
          <form
            onSubmit={handleSend}
            className={`p-3 border-t flex items-center gap-2 shrink-0 ${
              isDarkMode ? 'bg-[#202c33] border-[#222e35]' : 'bg-[#f0f2f5] border-[#e9edef]'
            }`}
          >
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              title="Ajouter un emoji"
            >
              <Smile className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              title="Joindre un document, image ou devis"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Tapez un message WhatsApp ou tapez / pour un modèle..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`flex-1 px-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#00a884] transition-all ${
                isDarkMode
                  ? 'bg-[#2a3942] border-[#2a3942] text-white placeholder-slate-400'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />

            {inputText.trim() ? (
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shadow-sm cursor-pointer transition-all shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            ) : (
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shadow-sm cursor-pointer transition-all shrink-0"
                title="Enregistrer une note vocale"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Sélectionnez une discussion WhatsApp pour commencer.
        </div>
      )}

      {/* 3. Right Column: WhatsApp Contact CRM Card Drawer */}
      {isSideDrawerOpen && activeConv && (
        <div
          className={`w-80 border-l flex flex-col h-full shrink-0 overflow-y-auto p-5 space-y-5 transition-colors ${
            isDarkMode
              ? 'bg-[#111b21] border-[#202c33] text-slate-100'
              : 'bg-white border-[#e9edef] text-slate-900'
          }`}
        >
          {/* Contact summary */}
          <div className="text-center pb-4 border-b dark:border-[#202c33]">
            <img
              src={
                activeConv.contactAvatar ||
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
              }
              alt={activeConv.contactName}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-[#00a884]"
            />
            <h3 className="font-extrabold text-sm mt-2">{activeConv.contactName}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {activeConv.channelIdentifier}
            </p>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366]/15 text-[#008069] dark:text-[#25D366]">
              <span>WhatsApp Cloud Synchronisé</span>
            </div>
          </div>

          {/* Deal Stage Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Étape Pipeline WACRM</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            </label>
            <select
              value={contactStages[activeConv.id] || 'PROPOSAL'}
              onChange={(e) =>
                setContactStages((prev) => ({ ...prev, [activeConv.id]: e.target.value }))
              }
              className={`w-full p-2 rounded-xl text-xs font-bold border focus:outline-none focus:ring-1 focus:ring-[#00a884] cursor-pointer ${
                isDarkMode
                  ? 'bg-[#202c33] border-[#2a3942] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="LEAD">Nouveau Prospect</option>
              <option value="CONTACTED">Premier Contact WA</option>
              <option value="MEETING">Démo Planifiée</option>
              <option value="PROPOSAL">Proposition / Devis Envoyé</option>
              <option value="NEGOTIATION">Négociation Finale</option>
              <option value="WON">Gagné (Client Validé) 🎉</option>
            </select>
          </div>

          {/* Deal Amount */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Valeur du Deal Estimée
            </label>
            <div className="relative">
              <input
                type="number"
                value={contactDeals[activeConv.id] || 0}
                onChange={(e) =>
                  setContactDeals((prev) => ({
                    ...prev,
                    [activeConv.id]: Number(e.target.value),
                  }))
                }
                className={`w-full pl-7 pr-3 py-2 rounded-xl text-xs font-bold border focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                  isDarkMode
                    ? 'bg-[#202c33] border-[#2a3942] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-400">€</span>
            </div>
          </div>

          {/* WhatsApp Labels */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Étiquettes WhatsApp</span>
              <Tag className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(contactLabels[activeConv.id] || []).map((lbl, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#00a884]/15 text-[#008069] dark:text-[#25D366] border border-[#00a884]/30"
                >
                  {lbl}
                </span>
              ))}
              <button
                onClick={() => {
                  const current = contactLabels[activeConv.id] || [];
                  const newTag = prompt('Nom de la nouvelle étiquette WhatsApp (ex: Relance J+3) :');
                  if (newTag) {
                    setContactLabels((prev) => ({
                      ...prev,
                      [activeConv.id]: [...current, newTag],
                    }));
                  }
                }}
                className="px-2 py-1 rounded-lg text-[10px] font-bold border border-dashed border-slate-300 dark:border-slate-700 hover:border-[#00a884] text-slate-500 cursor-pointer"
              >
                + Ajouter étiquette
              </button>
            </div>
          </div>

          {/* CRM Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Note Commerciale Interne
            </label>
            <textarea
              rows={3}
              value={contactNotes[activeConv.id] || ''}
              onChange={(e) =>
                setContactNotes((prev) => ({ ...prev, [activeConv.id]: e.target.value }))
              }
              placeholder="Ajoutez des détails sur ce contact..."
              className={`w-full p-2.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                isDarkMode
                  ? 'bg-[#202c33] border-[#2a3942] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Direct WhatsApp Call link button */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${activeConv.channelIdentifier.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Ouvrir dans WhatsApp Web</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
