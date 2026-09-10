import React, { useState } from 'react';
import { Contact, Workspace } from '../types';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Building,
  Tag,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface ContactsViewProps {
  contacts: Contact[];
  workspace: Workspace;
  onCreateContact: (newContact: Omit<Contact, 'id' | 'workspaceId' | 'lastContactedAt'>) => void;
  onOpenWhatsApp: (contact: Contact) => void;
  isDarkMode?: boolean;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contacts,
  workspace,
  onCreateContact,
  onOpenWhatsApp,
  isDarkMode = false,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | Contact['status']>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Contact['status']>('QUALIFIED');

  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.companyName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.whatsappPhone || '').includes(search);
    return matchesStatus && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    onCreateContact({
      firstName,
      lastName,
      email,
      phone,
      whatsappPhone: phone.replace(/[^0-9+]/g, '') || phone,
      companyName,
      title,
      status,
      tags: ['WhatsApp Sync', 'Inbound WACRM'],
      assignedTo: 'Alexandre Laurent',
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setTitle('');
    setShowCreateModal(false);
  };

  const statusColors: Record<Contact['status'], { bg: string; text: string }> = {
    LEAD: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300' },
    QUALIFIED: { bg: 'bg-blue-100 dark:bg-blue-950/80', text: 'text-blue-800 dark:text-blue-300' },
    CUSTOMER: { bg: 'bg-emerald-100 dark:bg-emerald-950/80', text: 'text-emerald-800 dark:text-emerald-300' },
    CHURNED: { bg: 'bg-rose-100 dark:bg-rose-950/80', text: 'text-rose-800 dark:text-rose-300' },
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#008069] dark:text-[#25D366] border border-[#25D366]/30">
              ● Base de Contacts Synchronisée
            </span>
            <span className="text-xs text-slate-500">
              {contacts.length} contacts WhatsApp
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#00a884]" />
            <span>Répertoire Contacts & Prospects WACRM</span>
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Contact WhatsApp</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#111b21] border-[#202c33] text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
        }`}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone WhatsApp, entreprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#00a884] transition-all ${
              isDarkMode
                ? 'bg-[#202c33] border-[#2a3942] text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Status Pills */}
        <div className="flex gap-1.5 overflow-x-auto text-xs font-semibold">
          {(['ALL', 'LEAD', 'QUALIFIED', 'CUSTOMER', 'CHURNED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-[#202c33] text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Tous les statuts' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#111b21] border-[#202c33] text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
        }`}
      >
        <table className="w-full text-left text-xs">
          <thead
            className={`border-b text-slate-500 uppercase tracking-wider font-bold text-[10px] ${
              isDarkMode ? 'bg-[#202c33] border-[#222e35]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <tr>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Entreprise & Poste</th>
              <th className="py-3 px-4">Statut WACRM</th>
              <th className="py-3 px-4">WhatsApp Direct</th>
              <th className="py-3 px-4">Tags</th>
              <th className="py-3 px-4 text-right">Action Directe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#202c33]">
            {filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-slate-50 dark:hover:bg-[#202c33]/40 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#00a884]/20 text-[#008069] dark:text-[#25D366] flex items-center justify-center font-bold text-xs shrink-0">
                      {contact.firstName.charAt(0)}
                      {contact.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px]">{contact.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {contact.companyName || '—'}
                  </div>
                  <div className="text-slate-400 text-[11px]">{contact.title || 'Non renseigné'}</div>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      statusColors[contact.status].bg
                    } ${statusColors[contact.status].text}`}
                  >
                    {contact.status}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {contact.whatsappPhone || contact.phone}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-[#202c33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2a3942]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onOpenWhatsApp(contact)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-[#25D366] hover:bg-[#20bd5a] px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                    title="Ouvrir la discussion WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Chat WA</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContacts.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            Aucun contact correspondant à votre recherche.
          </div>
        )}
      </div>

      {/* Create Contact Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 space-y-4 ${
              isDarkMode
                ? 'bg-[#111b21] border-[#202c33] text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <h3 className="font-bold text-sm">Ajouter un Contact WhatsApp</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Marc"
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                      isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Dubois"
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                      isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Numéro WhatsApp Business *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marc@entreprise.fr"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Entreprise</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ex: Acme Retail"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#00a884] ${
                    isDarkMode ? 'bg-[#202c33] border-[#2a3942] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold shadow-sm cursor-pointer"
                >
                  Enregistrer Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
