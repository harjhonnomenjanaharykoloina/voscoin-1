import React, { useState, useEffect } from 'react';
import { WacrmHeader } from './components/WacrmHeader';
import { WacrmSidebar, WacrmTab } from './components/WacrmSidebar';
import { DemoRequestModal, DemoFormData } from './components/DemoRequestModal';
import { InboxView } from './components/InboxView';
import { PipelineView } from './components/PipelineView';
import { CampaignsView } from './components/CampaignsView';
import { ContactsView } from './components/ContactsView';
import { WacrmAutomationsView } from './components/WacrmAutomationsView';
import { WacrmConnectionView } from './components/WacrmConnectionView';
import { SettingsView } from './components/SettingsView';
import { LtdLandingPage } from './components/LtdLandingPage';
import { SupportedLanguage } from './data/ltdTranslations';
import {
  initialWorkspaces,
  initialUsers,
  initialContacts,
  initialDeals,
  initialTasks,
  initialConversations,
  initialCampaigns,
} from './data/mockData';
import {
  Workspace,
  User,
  UserRole,
  Contact,
  Deal,
  Conversation,
  Campaign,
  ChannelType,
} from './types';
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export type ActiveAppTab = 'ltd' | WacrmTab;

export default function App() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(initialWorkspaces[0]);
  const [currentTab, setCurrentTab] = useState<ActiveAppTab>('ltd');
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('fr');

  // Demo modal control
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Target contact to focus in WhatsApp chat
  const [targetContactForChat, setTargetContactForChat] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Data state
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  // Filter items by active workspace
  const workspaceContacts = contacts.filter((c) => c.workspaceId === currentWorkspace.id);
  const workspaceDeals = deals.filter((d) => d.workspaceId === currentWorkspace.id);
  const workspaceConversations = conversations.filter(
    (c) => c.workspaceId === currentWorkspace.id,
  );
  const workspaceCampaigns = campaigns.filter((c) => c.workspaceId === currentWorkspace.id);

  const unreadInboxCount = workspaceConversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Handlers
  const handleRoleChange = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
  };

  const handleUpdateWorkspace = (updated: Workspace) => {
    setCurrentWorkspace(updated);
    setWorkspaces((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  // Demo request submission handler
  const handleDemoSuccess = (formData: DemoFormData) => {
    // Personalize workspace and user
    if (formData.companyName) {
      setCurrentWorkspace((prev) => ({
        ...prev,
        name: formData.companyName,
      }));
    }
    if (formData.fullName) {
      setCurrentUser((prev) => ({
        ...prev,
        name: formData.fullName,
        email: formData.email,
      }));
    }

    // Set demo banner notification
    setDemoNotice(
      `🎉 Bienvenue dans votre session démo WACRM, ${formData.fullName || 'Invité'} ! Vos accès WhatsApp Cloud sont préconfigurés.`,
    );
    setTimeout(() => setDemoNotice(null), 6000);

    // Switch directly to WhatsApp inbox
    setCurrentTab('inbox');
  };

  // WhatsApp Messaging Handlers
  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageAt: 'À l’instant',
            messages: [
              ...c.messages,
              {
                id: `msg_${Date.now()}`,
                sender: 'AGENT',
                senderName: currentUser.name,
                content: text,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                channel: c.channel,
                status: 'DELIVERED',
              },
            ],
          };
        }
        return c;
      }),
    );
  };

  const handleSimulateInbound = (conversationId: string, channel: ChannelType) => {
    const responses = [
      'Parfait, je valide le devis WACRM ! Quand pouvons-nous commencer la formation ?',
      'Merci beaucoup ! Est-ce que le bot WhatsApp gère aussi les messages vocaux ?',
      'Très clair. Pouvez-vous me partager la documentation de l’API Meta ?',
      'Bonjour, pouvez-vous me rappeler au numéro de l’entreprise ? Merci !',
    ];
    const randomText = responses[Math.floor(Math.random() * responses.length)];

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            unreadCount: c.unreadCount + 1,
            lastMessage: randomText,
            lastMessageAt: 'À l’instant',
            messages: [
              ...c.messages,
              {
                id: `msg_${Date.now()}`,
                sender: 'CUSTOMER',
                senderName: c.contactName,
                content: randomText,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                channel,
                status: 'READ',
              },
            ],
          };
        }
        return c;
      }),
    );
  };

  // Pipeline Handlers
  const handleUpdateDealStage = (dealId: string, newStage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)),
    );
  };

  const handleCreateDeal = (newDeal: Omit<Deal, 'id' | 'workspaceId'>) => {
    const created: Deal = {
      ...newDeal,
      id: `deal_${Date.now()}`,
      workspaceId: currentWorkspace.id,
    };
    setDeals([created, ...deals]);
  };

  // Contacts Handlers
  const handleCreateContact = (
    newContact: Omit<Contact, 'id' | 'workspaceId' | 'lastContactedAt'>,
  ) => {
    const created: Contact = {
      ...newContact,
      id: `cnt_${Date.now()}`,
      workspaceId: currentWorkspace.id,
      lastContactedAt: 'À l’instant',
    };
    setContacts([created, ...contacts]);
  };

  const handleOpenWhatsAppFromContact = (contact: Contact) => {
    setTargetContactForChat(`${contact.firstName} ${contact.lastName}`);
    setCurrentTab('inbox');
  };

  const handleOpenWhatsAppFromDeal = (contactName: string) => {
    setTargetContactForChat(contactName);
    setCurrentTab('inbox');
  };

  // Broadcast campaign handler
  const handleCreateCampaign = (
    newCampaign: Omit<
      Campaign,
      'id' | 'workspaceId' | 'sentCount' | 'deliveredCount' | 'readCount' | 'failedCount'
    >,
  ) => {
    const created: Campaign = {
      ...newCampaign,
      id: `camp_${Date.now()}`,
      workspaceId: currentWorkspace.id,
      sentCount: 1200,
      deliveredCount: 1180,
      readCount: 1060,
      failedCount: 20,
    };
    setCampaigns([created, ...campaigns]);
  };

  // If on the LTD landing page
  if (currentTab === 'ltd') {
    return (
      <>
        <LtdLandingPage
          onOpenApp={() => setIsDemoModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          currentLang={currentLang}
          onChangeLang={setCurrentLang}
        />

        {/* Formulaire de demande de démo WACRM */}
        <DemoRequestModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onSuccess={handleDemoSuccess}
          isDarkMode={isDarkMode}
        />
      </>
    );
  }

  // WACRM Main App Layout
  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased ${
        isDarkMode ? 'bg-[#0c1317] text-slate-100' : 'bg-[#f0f2f5] text-slate-900'
      }`}
    >
      {/* WACRM Header */}
      <WacrmHeader
        workspaces={workspaces}
        currentWorkspace={currentWorkspace}
        onSelectWorkspace={setCurrentWorkspace}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        onOpenLtd={() => setCurrentTab('ltd')}
        onRequestDemo={() => setIsDemoModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Demo Notification Banner */}
      {demoNotice && (
        <div className="bg-[#25D366] text-slate-950 font-bold px-4 py-2.5 text-xs flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Sparkles className="w-4 h-4 fill-slate-950 shrink-0" />
            <span>{demoNotice}</span>
          </div>
          <button
            onClick={() => setDemoNotice(null)}
            className="text-slate-950 hover:opacity-75 font-black text-sm cursor-pointer ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* WACRM Sidebar */}
        <WacrmSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setTargetContactForChat(null);
            setCurrentTab(tab);
          }}
          unreadInboxCount={unreadInboxCount}
        />

        {/* Dynamic Content Views */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'inbox' && (
            <InboxView
              conversations={workspaceConversations}
              onSendMessage={handleSendMessage}
              onSimulateInbound={handleSimulateInbound}
              isDarkMode={isDarkMode}
              targetContactName={targetContactForChat}
            />
          )}

          {currentTab === 'pipeline' && (
            <PipelineView
              deals={workspaceDeals}
              workspace={currentWorkspace}
              onUpdateDealStage={handleUpdateDealStage}
              onCreateDeal={handleCreateDeal}
              onOpenWhatsApp={handleOpenWhatsAppFromDeal}
              isDarkMode={isDarkMode}
            />
          )}

          {currentTab === 'campaigns' && (
            <CampaignsView
              campaigns={workspaceCampaigns}
              workspace={currentWorkspace}
              onCreateCampaign={handleCreateCampaign}
              isDarkMode={isDarkMode}
            />
          )}

          {currentTab === 'contacts' && (
            <ContactsView
              contacts={workspaceContacts}
              workspace={currentWorkspace}
              onCreateContact={handleCreateContact}
              onOpenWhatsApp={handleOpenWhatsAppFromContact}
              isDarkMode={isDarkMode}
            />
          )}

          {currentTab === 'automations' && (
            <WacrmAutomationsView isDarkMode={isDarkMode} />
          )}

          {currentTab === 'connection' && (
            <WacrmConnectionView isDarkMode={isDarkMode} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              workspace={currentWorkspace}
              onUpdateWorkspace={handleUpdateWorkspace}
            />
          )}
        </main>
      </div>

      {/* Formulaire de demande de démo WACRM */}
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSuccess={handleDemoSuccess}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
