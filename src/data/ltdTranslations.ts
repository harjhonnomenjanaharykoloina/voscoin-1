export type SupportedLanguage = 'fr' | 'en' | 'de';

export interface LTDPlan {
  id: 'solo' | 'pro' | 'unlimited';
  name: string;
  badge?: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface LTDTranslations {
  nav: {
    features: string;
    pricing: string;
    comparison: string;
    faq: string;
    testimonials: string;
    openApp: string;
    claimDeal: string;
  };
  hero: {
    pill: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    guarantee: string;
    scarcity: string;
    noSubscription: string;
  };
  stats: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  featuresSection: {
    tag: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  pricingSection: {
    tag: string;
    title: string;
    subtitle: string;
    oneTimePayment: string;
    lifetimeAccess: string;
    savePercent: string;
    plans: LTDPlan[];
  };
  comparison: {
    tag: string;
    title: string;
    subtitle: string;
    features: {
      category: string;
      name: string;
      solo: boolean | string;
      pro: boolean | string;
      unlimited: boolean | string;
    }[];
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
    items: {
      quote: string;
      author: string;
      role: string;
      company: string;
      avatar: string;
      rating: number;
    }[];
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  checkoutModal: {
    title: string;
    subtitle: string;
    selectedPlan: string;
    price: string;
    oneTime: string;
    nameLabel: string;
    emailLabel: string;
    workspaceNameLabel: string;
    confirmBtn: string;
    closeBtn: string;
    successTitle: string;
    successMessage: string;
    licenseKeyLabel: string;
    launchAppBtn: string;
  };
  footer: {
    tagline: string;
    rights: string;
    privacy: string;
    terms: string;
    status: string;
  };
}

export const ltdTranslations: Record<SupportedLanguage, LTDTranslations> = {
  fr: {
    nav: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs LTD',
      comparison: 'Comparatif',
      faq: 'FAQ',
      testimonials: 'Avis Clients',
      openApp: 'Accéder au CRM',
      claimDeal: 'Obtenir ma licence dès 99$',
    },
    hero: {
      pill: '🔥 OFFRE DE LANCEMENT LIMITÉE • PAIEMENT UNIQUE À VIE',
      titleStart: 'Le CRM Omnicanal qui booste vos ventes,',
      titleHighlight: 'sans aucun abonnement mensuel',
      titleEnd: '.',
      subtitle:
        'Centralisez WhatsApp Business, Meta Messenger et Email dans une boîte de réception unique. Automatisez votre pipeline commercial avec l’IA et profitez d’une infrastructure NestJS, MongoDB et Redis ultra-rapide.',
      ctaPrimary: 'Obtenir ma Licence à Vie dès 99$',
      ctaSecondary: 'Tester la Démo en Direct',
      guarantee: 'Garantie 30 jours satisfait ou remboursé • Zéro frais cachés',
      scarcity: '⚡ 89% des licences vendues — Plus que 27 licences disponibles à ce tarif promotionnel',
      noSubscription: 'Paiement unique • Mises à jour incluses à vie',
    },
    stats: {
      stat1Value: '99$',
      stat1Label: 'Prix de départ à vie',
      stat2Value: '3-en-1',
      stat2Label: 'WhatsApp, Meta & Email',
      stat3Value: '100%',
      stat3Label: 'Multi-Tenant sécurisé',
      stat4Value: '0$',
      stat4Label: 'Abonnement récurrent',
    },
    featuresSection: {
      tag: 'ARCHITECTURE & EXCELLENCE',
      title: 'Tout ce dont vous avez besoin pour dominer votre marché',
      subtitle:
        'Conçu avec les technologies les plus fiables du marché : NestJS, MongoDB avec Prisma ORM, Redis & BullMQ pour un traitement instantané.',
      items: [
        {
          title: 'Boîte de Réception Omnicanale',
          description:
            'Répondez à vos prospects sur WhatsApp Cloud API, Messenger et Email depuis une seule et même interface collaborative.',
        },
        {
          title: 'Pipeline de Vente Visuel Kanban',
          description:
            'Suivez chaque deal de la phase Lead jusqu’au closing Won. Calculez vos prévisions de chiffre d’affaires en temps réel.',
        },
        {
          title: 'Moteur IA Conversationnel',
          description:
            'Générez des résumés d’échanges automatiques et des suggestions de réponses pertinentes en un clic grâce à l’abstraction d’IA NestJS.',
        },
        {
          title: 'Files Redis & BullMQ',
          description:
            'Envoyez des campagnes de relance à des milliers de contacts sans ralentissement grâce au traitement asynchrone sécurisé.',
        },
        {
          title: 'Sécurité & Multi-Tenancy Inviolable',
          description:
            'Isolation étanche des données par Workspace via MongoDB ObjectId, protection anti-injection NoSQL et contrôle RBAC strict.',
        },
        {
          title: 'Gestion des Tâches & Planning',
          description:
            'Attribuez des rappels à vos collaborateurs et synchronisez les échéances clés pour ne rater aucune opportunité.',
        },
      ],
    },
    pricingSection: {
      tag: 'TARIFS OFFICIELS LTD • OFFRE À VIE LIMITÉE',
      title: 'Choisissez votre licence à vie, payez une seule fois',
      subtitle:
        'Économisez des milliers d’euros par an par rapport aux abonnements récurrents coûteux (HubSpot, Salesforce, Respond.io). Mises à jour majeures et support inclus à vie.',
      oneTimePayment: 'Paiement unique à vie',
      lifetimeAccess: 'Accès permanent',
      savePercent: 'Économisez jusqu’à 88%',
      plans: [
        {
          id: 'solo',
          name: 'Licence Solo',
          price: 99,
          originalPrice: 499,
          description:
            'Parfait pour les indépendants, consultants, freelances et solopreneurs cherchant une efficacité maximale.',
          features: [
            '1 Utilisateur (Licence personnelle)',
            '1 Workspace complet',
            'Contacts & Entreprises illimités',
            'Deals & Pipeline Kanban illimités',
            'Connecteur WhatsApp Business API',
            'Boîte Email unifiée (SMTP / IMAP)',
            'Base de données MongoDB avec Prisma',
            'Mises à jour à vie du logiciel',
            'Facturation & TVA Pro déductible',
            'Support communautaire & documentation',
          ],
          cta: 'Obtenir la Licence Solo (99$)',
        },
        {
          id: 'pro',
          name: 'Licence Pro',
          badge: 'LE PLUS POPULAIRE',
          price: 149,
          originalPrice: 899,
          popular: true,
          description:
            'Idéal pour les équipes commerciales, agences et PME en pleine croissance qui veulent collaborer.',
          features: [
            'Jusqu’à 5 Utilisateurs inclus',
            '3 Workspaces indépendants (Multi-tenant)',
            'Tous les avantages de la Licence Solo',
            'WhatsApp + Meta Messenger + Email complets',
            'Files asynchrones Redis & BullMQ dédiées',
            'Assistant IA : résumés et réponses suggérées',
            'Gestion des Rôles & Permissions RBAC',
            'Campagnes omnicanales & automatisations',
            'Support prioritaire par email & chat',
            'Mises à jour à vie & nouvelles fonctionnalités',
          ],
          cta: 'Obtenir la Licence Pro (149$)',
        },
        {
          id: 'unlimited',
          name: 'Licence Illimitée',
          badge: 'MEILLEURE VALEUR',
          price: 179,
          originalPrice: 1499,
          description:
            'La solution ultime pour entreprises ambitieuses, agences multi-clients et scale-ups sans aucune limite.',
          features: [
            'UTILISATEURS ILLIMITÉS',
            'WORKSPACES ILLIMITÉS (Multi-clients)',
            'Tous les avantages de la Licence Pro',
            'Tous les canaux omnicanaux sans plafond',
            'File prioritaire BullMQ haute performance',
            'Moteur IA illimité (OpenAI / Gemini configurable)',
            'Journal d’audit complet & conformité RGPD',
            'Accès API REST & Webhooks personnalisés',
            'Clé de licence déploiement prioritaire',
            'Accompagnement d’onboarding & support VIP 24/7',
          ],
          cta: 'Obtenir la Licence Illimitée (179$)',
        },
      ],
    },
    comparison: {
      tag: 'MATRICE DÉTAILLÉE',
      title: 'Comparez nos 3 offres de licence à vie',
      subtitle: 'Toutes les fonctionnalités techniques détaillées sans compromis.',
      features: [
        { category: 'Accès & Équipes', name: 'Nombre d’utilisateurs', solo: '1 utilisateur', pro: '5 utilisateurs', unlimited: 'Illimités' },
        { category: 'Accès & Équipes', name: 'Nombre de workspaces', solo: '1 workspace', pro: '3 workspaces', unlimited: 'Illimités' },
        { category: 'Accès & Équipes', name: 'Rôles & Permissions RBAC', solo: false, pro: true, unlimited: true },
        { category: 'Omnicanal', name: 'WhatsApp Cloud API', solo: true, pro: true, unlimited: true },
        { category: 'Omnicanal', name: 'Meta Messenger Webhooks', solo: false, pro: true, unlimited: true },
        { category: 'Omnicanal', name: 'Email professionnel unifié', solo: true, pro: true, unlimited: true },
        { category: 'Omnicanal', name: 'Campagnes de masse BullMQ', solo: false, pro: true, unlimited: true },
        { category: 'Intelligence Artificielle', name: 'Résumés IA automatiques', solo: false, pro: true, unlimited: true },
        { category: 'Intelligence Artificielle', name: 'Suggestions de réponses IA', solo: false, pro: true, unlimited: true },
        { category: 'Infrastructure', name: 'Backend NestJS + MongoDB', solo: true, pro: true, unlimited: true },
        { category: 'Infrastructure', name: 'File asynchrone Redis', solo: 'Standard', pro: 'Dédiée', unlimited: 'Prioritaire VIP' },
        { category: 'Infrastructure', name: 'Accès Webhooks & API REST', solo: false, pro: false, unlimited: true },
        { category: 'Support & Mises à jour', name: 'Mises à jour à vie', solo: true, pro: true, unlimited: true },
        { category: 'Support & Mises à jour', name: 'Niveau de support', solo: 'Standard', pro: 'Prioritaire', unlimited: 'VIP 24/7' },
      ],
    },
    testimonials: {
      tag: 'RETOURS D’EXPÉRIENCE',
      title: 'Ils ont remplacé leurs abonnements mensuels coûteux',
      subtitle: 'Découvrez pourquoi plus de 1 200 équipes ont choisi l’offre LTD de NextCRM.',
      items: [
        {
          quote:
            'NextCRM nous a permis d’économiser plus de 2 400€ par an par rapport à HubSpot. La centralisation de WhatsApp est une véritable révolution pour notre équipe commerciale.',
          author: 'Élodie Mercier',
          role: 'Directrice Commerciale',
          company: 'Aura Growth Agency',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'La licence illimitée à 179$ est une opportunité incroyable. L’architecture NestJS et MongoDB est d’une rapidité impressionnante, les files BullMQ gèrent nos envois sans accroc.',
          author: 'Marc Lefebvre',
          role: 'Fondateur & CTO',
          company: 'NovaTech SaaS',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'En tant que freelance, la licence Solo à 99$ a été rentabilisée dès la première semaine. Finis les abonnements qui grignotent ma marge !',
          author: 'Julien Bertin',
          role: 'Consultant B2B',
          company: 'Bertin Conseil',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
      ],
    },
    faq: {
      tag: 'FOIRE AUX QUESTIONS',
      title: 'Tout ce que vous devez savoir sur notre offre LTD',
      subtitle: 'Transparence totale : pas de frais masqués, pas de surprise.',
      items: [
        {
          question: 'Que signifie exactement "Licence à vie" (Lifetime Deal) ?',
          answer:
            'Vous effectuez un paiement unique aujourd’hui et bénéficiez d’un accès complet et permanent à NextCRM sans jamais avoir à régler d’abonnement mensuel ou annuel. Toutes les mises à jour futures sont incluses.',
        },
        {
          question: 'Y a-t-il des frais mensuels cachés ?',
          answer:
            'Non. Aucun frais d’abonnement pour le logiciel NextCRM. Pour WhatsApp Cloud API, vous utilisez directement l’infrastructure officielle Meta (Meta offre 1 000 conversations gratuites de service chaque mois).',
        },
        {
          question: 'Puis-je changer de licence plus tard ?',
          answer:
            'Oui, vous pourrez facilement passer d’une licence Solo à Pro ou Illimitée en réglant uniquement la différence de prix tant que l’offre de lancement est active.',
        },
        {
          question: 'Comment fonctionne la garantie satisfait ou remboursé de 30 jours ?',
          answer:
            'Si NextCRM ne convient pas à vos attentes pour quelque raison que ce soit dans les 30 jours suivant votre achat, écrivez-nous et nous vous remboursons intégralement, sans aucune question.',
        },
        {
          question: 'Comment mes données sont-elles hébergées et protégées ?',
          answer:
            'NextCRM s’appuie sur MongoDB avec une isolation stricte par Workspace (multi-tenancy inviolable). Vos identifiants de canaux et vos données clients restent entièrement confidentiels.',
        },
        {
          question: 'Comment recevoir et activer ma clé de licence ?',
          answer:
            'Dès la validation de votre commande, votre clé de licence unique (ex: NXT-LTD-PRO-XXXX) est générée immédiatement et peut être activée directement sur votre espace NextCRM.',
        },
      ],
    },
    checkoutModal: {
      title: 'Finaliser votre commande Lifetime Deal',
      subtitle: 'Paiement sécurisé et activation immédiate de votre licence NextCRM',
      selectedPlan: 'Formule sélectionnée',
      price: 'Montant total',
      oneTime: 'Paiement unique • Accès à vie',
      nameLabel: 'Nom complet',
      emailLabel: 'Adresse email professionnelle',
      workspaceNameLabel: 'Nom de votre entreprise / Workspace',
      confirmBtn: 'Valider et Générer ma Clé de Licence',
      closeBtn: 'Annuler',
      successTitle: '🎉 Félicitations ! Votre licence LTD est activée',
      successMessage: 'Votre licence a été enregistrée avec succès dans le système NextCRM.',
      licenseKeyLabel: 'Votre Clé de Licence Officielle :',
      launchAppBtn: 'Ouvrir mon CRM NextCRM Maintenant',
    },
    footer: {
      tagline: 'Le CRM omnicanal moderne avec NestJS, MongoDB & BullMQ.',
      rights: 'Tous droits réservés. Offre Lifetime Deal officielle NextCRM.',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions Générales de Vente',
      status: 'Système & Serveurs opérationnels (99.99%)',
    },
  },

  en: {
    nav: {
      features: 'Features',
      pricing: 'LTD Pricing',
      comparison: 'Comparison',
      faq: 'FAQ',
      testimonials: 'Reviews',
      openApp: 'Launch CRM App',
      claimDeal: 'Get My License from $99',
    },
    hero: {
      pill: '🔥 LIMITED LAUNCH OFFER • ONE-TIME LIFETIME PAYMENT',
      titleStart: 'The Omnichannel CRM that accelerates your sales,',
      titleHighlight: 'with zero monthly subscriptions',
      titleEnd: '.',
      subtitle:
        'Unify WhatsApp Business, Meta Messenger, and Email into a single smart inbox. Automate your sales pipeline with AI and enjoy an ultra-fast NestJS, MongoDB, and Redis cloud architecture.',
      ctaPrimary: 'Claim Your Lifetime Deal from $99',
      ctaSecondary: 'Test Live Interactive Demo',
      guarantee: '30-Day Money-Back Guarantee • Zero Hidden Fees',
      scarcity: '⚡ 89% of licenses claimed — Only 27 licenses left at this special introductory rate',
      noSubscription: 'One-time payment • Lifetime updates included',
    },
    stats: {
      stat1Value: '$99',
      stat1Label: 'Starting lifetime price',
      stat2Value: '3-in-1',
      stat2Label: 'WhatsApp, Meta & Email',
      stat3Value: '100%',
      stat3Label: 'Secure Multi-Tenant',
      stat4Value: '$0',
      stat4Label: 'Recurring subscription fees',
    },
    featuresSection: {
      tag: 'ARCHITECTURE & EXCELLENCE',
      title: 'Everything you need to scale your revenue',
      subtitle:
        'Engineered with industry-leading enterprise technologies: NestJS, MongoDB with Prisma ORM, Redis & BullMQ for instant processing.',
      items: [
        {
          title: 'Omnichannel Unified Inbox',
          description:
            'Engage your prospects on WhatsApp Cloud API, Messenger, and Email from a unified collaborative workspace.',
        },
        {
          title: 'Visual Kanban Sales Pipeline',
          description:
            'Track every deal from Lead qualification to Won closing. Calculate real-time revenue forecasts and stage conversion rates.',
        },
        {
          title: 'Conversational AI Engine',
          description:
            'Generate automatic conversation summaries and smart replies with one click via our NestJS AI Provider abstraction.',
        },
        {
          title: 'Redis & BullMQ Queues',
          description:
            'Deliver high-volume campaigns to thousands of contacts with zero latency using background queue workers.',
        },
        {
          title: 'Enterprise Multi-Tenancy & Security',
          description:
            'Watertight Workspace isolation with MongoDB ObjectId, NoSQL injection protection, and granular RBAC controls.',
        },
        {
          title: 'Task Management & Scheduling',
          description:
            'Assign reminders to team members and keep track of critical deadlines so you never miss an opportunity.',
        },
      ],
    },
    pricingSection: {
      tag: 'OFFICIAL LTD PRICING • LIMITED LIFETIME DEAL',
      title: 'Choose your lifetime license, pay once forever',
      subtitle:
        'Save thousands of dollars per year compared to expensive monthly alternatives (HubSpot, Salesforce, Respond.io). Major software updates and support included forever.',
      oneTimePayment: 'One-time lifetime payment',
      lifetimeAccess: 'Lifetime access',
      savePercent: 'Save up to 88%',
      plans: [
        {
          id: 'solo',
          name: 'Solo License',
          price: 99,
          originalPrice: 499,
          description:
            'Ideal for individual entrepreneurs, freelancers, and solopreneurs looking for peak sales efficiency.',
          features: [
            '1 User (Personal License)',
            '1 Complete Workspace',
            'Unlimited Contacts & Companies',
            'Unlimited Deals & Kanban Pipelines',
            'WhatsApp Business API connector',
            'Unified Email Inbox (SMTP / IMAP)',
            'MongoDB database with Prisma ORM',
            'Lifetime software updates',
            'Official VAT invoice provided',
            'Community support & docs',
          ],
          cta: 'Get Solo License ($99)',
        },
        {
          id: 'pro',
          name: 'Pro License',
          badge: 'MOST POPULAR',
          price: 149,
          originalPrice: 899,
          popular: true,
          description:
            'Best for growing sales teams, agencies, and SMBs who want to collaborate seamlessly.',
          features: [
            'Up to 5 Users included',
            '3 Separate Workspaces (Multi-Tenant)',
            'All features from Solo License',
            'WhatsApp + Meta Messenger + Email',
            'Dedicated Redis & BullMQ queues',
            'AI Assistant: summaries & smart replies',
            'Role-based access control (RBAC)',
            'Omnichannel campaigns & automations',
            'Priority email & chat support',
            'Lifetime updates & new features',
          ],
          cta: 'Get Pro License ($149)',
        },
        {
          id: 'unlimited',
          name: 'Unlimited License',
          badge: 'BEST VALUE',
          price: 179,
          originalPrice: 1499,
          description:
            'The ultimate solution for ambitious companies, multi-client agencies, and scale-ups with zero restrictions.',
          features: [
            'UNLIMITED USERS',
            'UNLIMITED WORKSPACES (Multi-Client)',
            'All features from Pro License',
            'All omnichannel channels without limits',
            'High-priority VIP BullMQ queue',
            'Unlimited AI engine (OpenAI / Gemini configurable)',
            'Complete audit logs & GDPR compliance',
            'Custom REST API & Webhooks access',
            'Priority license key dispatch',
            'Dedicated onboarding & 24/7 VIP support',
          ],
          cta: 'Get Unlimited License ($179)',
        },
      ],
    },
    comparison: {
      tag: 'FEATURE BREAKDOWN',
      title: 'Detailed breakdown of our 3 lifetime licenses',
      subtitle: 'Complete technical transparency with no fine print.',
      features: [
        { category: 'Team & Access', name: 'Users included', solo: '1 user', pro: '5 users', unlimited: 'Unlimited' },
        { category: 'Team & Access', name: 'Workspaces included', solo: '1 workspace', pro: '3 workspaces', unlimited: 'Unlimited' },
        { category: 'Team & Access', name: 'RBAC Roles & Permissions', solo: false, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'WhatsApp Cloud API', solo: true, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'Meta Messenger Webhooks', solo: false, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'Unified Business Email', solo: true, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'BullMQ Mass Campaigns', solo: false, pro: true, unlimited: true },
        { category: 'Artificial Intelligence', name: 'Automatic AI Summaries', solo: false, pro: true, unlimited: true },
        { category: 'Artificial Intelligence', name: 'Smart AI Reply Suggestions', solo: false, pro: true, unlimited: true },
        { category: 'Infrastructure', name: 'NestJS Backend + MongoDB', solo: true, pro: true, unlimited: true },
        { category: 'Infrastructure', name: 'Redis Asynchronous Queue', solo: 'Standard', pro: 'Dedicated', unlimited: 'VIP Priority' },
        { category: 'Infrastructure', name: 'REST API & Custom Webhooks', solo: false, pro: false, unlimited: true },
        { category: 'Support & Updates', name: 'Lifetime updates', solo: true, pro: true, unlimited: true },
        { category: 'Support & Updates', name: 'Support Level', solo: 'Standard', pro: 'Priority', unlimited: '24/7 VIP' },
      ],
    },
    testimonials: {
      tag: 'VERIFIED REVIEWS',
      title: 'Trusted by over 1,200 fast-growing teams',
      subtitle: 'See why founders and sales leaders traded costly subscriptions for NextCRM LTD.',
      items: [
        {
          quote:
            'NextCRM saved our agency more than $3,000 annually. Having WhatsApp and Email unified into one pipeline is an absolute game-changer.',
          author: 'Sarah Jenkins',
          role: 'Head of Sales',
          company: 'Aura Growth Agency',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'The Unlimited License at $179 is unbelievable value. The NestJS backend and MongoDB database respond instantly, and BullMQ handles campaigns like a breeze.',
          author: 'David Meyer',
          role: 'CTO & Co-founder',
          company: 'NovaTech SaaS',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'As a solo consultant, the $99 Solo license paid for itself within my very first week. Zero recurring monthly fees to worry about.',
          author: 'Julian Barnes',
          role: 'B2B Sales Consultant',
          company: 'Barnes Advisory',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
      ],
    },
    faq: {
      tag: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Everything you need to know about our LTD offer',
      subtitle: 'Total transparency: no recurring charges, no surprises.',
      items: [
        {
          question: 'What does Lifetime Deal (LTD) mean?',
          answer:
            'You pay once today and get perpetual, uninterrupted access to NextCRM without ever paying monthly or annual subscription fees. All future core updates are included.',
        },
        {
          question: 'Are there any hidden recurring fees?',
          answer:
            'No. There are no monthly software fees from NextCRM. For WhatsApp Cloud API, you use Meta’s official API (Meta provides 1,000 free service conversations each month).',
        },
        {
          question: 'Can I upgrade my license later?',
          answer:
            'Yes! You can easily upgrade from Solo to Pro or Unlimited simply by paying the price difference while the introductory launch offer remains active.',
        },
        {
          question: 'How does the 30-day money-back guarantee work?',
          answer:
            'If NextCRM does not meet your expectations for any reason within 30 days of purchase, simply reach out to our support team for a full refund.',
        },
        {
          question: 'How is customer data isolated and secured?',
          answer:
            'NextCRM implements strict multi-tenancy at the MongoDB database level using Workspace ObjectIds. Customer data and API credentials are kept strictly isolated and encrypted.',
        },
        {
          question: 'How do I receive and activate my license key?',
          answer:
            'Upon completing your order, your official license key (e.g. NXT-LTD-PRO-XXXX) is generated instantly and ready to be applied directly in your NextCRM workspace.',
        },
      ],
    },
    checkoutModal: {
      title: 'Complete Your Lifetime Deal Order',
      subtitle: 'Secure checkout and instant license key activation for NextCRM',
      selectedPlan: 'Selected License',
      price: 'Total Amount',
      oneTime: 'One-time payment • Lifetime access',
      nameLabel: 'Full Name',
      emailLabel: 'Work Email Address',
      workspaceNameLabel: 'Company / Workspace Name',
      confirmBtn: 'Confirm & Generate My License Key',
      closeBtn: 'Cancel',
      successTitle: '🎉 Congratulations! Your LTD License is Active',
      successMessage: 'Your lifetime license has been successfully registered into NextCRM.',
      licenseKeyLabel: 'Your Official License Key:',
      launchAppBtn: 'Open NextCRM Workspace Now',
    },
    footer: {
      tagline: 'The modern omnichannel CRM built on NestJS, MongoDB & BullMQ.',
      rights: 'All rights reserved. Official NextCRM Lifetime Deal.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      status: 'Systems & Cloud Infrastructure 99.99% Operational',
    },
  },

  de: {
    nav: {
      features: 'Funktionen',
      pricing: 'LTD-Preise',
      comparison: 'Vergleich',
      faq: 'FAQ',
      testimonials: 'Bewertungen',
      openApp: 'Zum CRM',
      claimDeal: 'Lizenz ab 99$ sichern',
    },
    hero: {
      pill: '🔥 LIMITIERTES EINFÜHRUNGSANGEBOT • EINMALIGE LEBENSLANGE ZAHLUNG',
      titleStart: 'Das Omnichannel-CRM für maximalen Umsatz,',
      titleHighlight: 'ohne monatliche Abogebühren',
      titleEnd: '.',
      subtitle:
        'Bündeln Sie WhatsApp Business, Meta Messenger und E-Mail in einem zentralen Posteingang. Automatisieren Sie Ihre Vertriebspipeline mit KI und profitieren Sie von einer blitzschnellen NestJS-, MongoDB- und Redis-Architektur.',
      ctaPrimary: 'Lebenslange Lizenz ab 99$ sichern',
      ctaSecondary: 'Live-Demo jetzt testen',
      guarantee: '30-Tage-Geld-zurück-Garantie • Keine versteckten Kosten',
      scarcity: '⚡ 89% der Lizenzen vergeben — Nur noch 27 Lizenzen zu diesem Einführungspreis verfügbar',
      noSubscription: 'Einmalzahlung • Lebenslange Updates inklusive',
    },
    stats: {
      stat1Value: '99$',
      stat1Label: 'Startpreis auf Lebenszeit',
      stat2Value: '3-in-1',
      stat2Label: 'WhatsApp, Meta & E-Mail',
      stat3Value: '100%',
      stat3Label: 'Sichere Mandantentrennung',
      stat4Value: '0$',
      stat4Label: 'Laufende Abokosten',
    },
    featuresSection: {
      tag: 'ARCHITEKTUR & QUALITÄT',
      title: 'Alles, was Sie für erfolgreichen Vertrieb benötigen',
      subtitle:
        'Entwickelt mit den zuverlässigsten modernen Technologien: NestJS, MongoDB mit Prisma ORM, Redis & BullMQ für blitzschnelle asynchrone Verarbeitung.',
      items: [
        {
          title: 'Zentraler Omnichannel-Posteingang',
          description:
            'Beantworten Sie Anfragen über WhatsApp Cloud API, Messenger und E-Mail über eine einzige kollaborative Oberfläche.',
        },
        {
          title: 'Visuelle Kanban-Vertriebspipeline',
          description:
            'Verfolgen Sie jeden Deal von der Lead-Erfassung bis zum Abschluss. Berechnen Sie Umsatzprognosen in Echtzeit.',
        },
        {
          title: 'Konversations-KI-Engine',
          description:
            'Erstellen Sie automatische Gesprächszusammenfassungen und intelligente Antwortvorschläge per Mausklick.',
        },
        {
          title: 'Redis & BullMQ Warteschlangen',
          description:
            'Versenden Sie Kampagnen an Tausende Kontakte ohne Verzögerung dank asynchroner Hintergrundverarbeitung.',
        },
        {
          title: 'Sichere Multi-Tenancy & Datenschutz',
          description:
            'Strikte Datenisolierung pro Workspace mittels MongoDB ObjectId, NoSQL-Injektionsschutz und RBAC-Rollen.',
        },
        {
          title: 'Aufgaben- & Terminplanung',
          description:
            'Weisen Sie Aufgaben zu und behalten Sie wichtige Fristen im Blick, um keinen Geschäftsabschluss zu verpassen.',
        },
      ],
    },
    pricingSection: {
      tag: 'OFFIZIELLE LTD-TARIFE • LIMITIERTES LEBENSLANGES ANGEBOT',
      title: 'Wählen Sie Ihre Lizenz auf Lebenszeit, zahlen Sie nur einmal',
      subtitle:
        'Sparen Sie tausende Euro jährlich im Vergleich zu teuren monatlichen Abonnements (HubSpot, Salesforce, Respond.io). Alle Hauptupdates und Support lebenslang inklusive.',
      oneTimePayment: 'Einmalige Lifetime-Zahlung',
      lifetimeAccess: 'Lebenslanger Zugriff',
      savePercent: 'Bis zu 88% Sparen',
      plans: [
        {
          id: 'solo',
          name: 'Solo-Lizenz',
          price: 99,
          originalPrice: 499,
          description:
            'Perfekt für Einzelunternehmer, Freelancer und Berater, die maximale Vertriebseffizienz suchen.',
          features: [
            '1 Benutzer (Persönliche Lizenz)',
            '1 Vollständiger Workspace',
            'Unbegrenzte Kontakte & Unternehmen',
            'Unbegrenzte Deals & Kanban-Pipelines',
            'WhatsApp Business API Anbindung',
            'Zentrales E-Mail-Postfach (SMTP/IMAP)',
            'MongoDB-Datenbank mit Prisma ORM',
            'Lebenslange Software-Updates',
            'Offizielle Rechnung mit MwSt.',
            'Community-Support & Dokumentation',
          ],
          cta: 'Solo-Lizenz wählen (99$)',
        },
        {
          id: 'pro',
          name: 'Pro-Lizenz',
          badge: 'BELIEBTESTE WAHL',
          price: 149,
          originalPrice: 899,
          popular: true,
          description:
            'Ideal für wachsende Vertriebsteams, Agenturen und KMUs mit kollaborativen Anforderungen.',
          features: [
            'Bis zu 5 Benutzer inklusive',
            '3 separate Workspaces (Multi-Tenant)',
            'Alle Funktionen der Solo-Lizenz',
            'WhatsApp + Meta Messenger + E-Mail',
            'Dedizierte Redis & BullMQ Warteschlangen',
            'KI-Assistent: Zusammenfassungen & Antworten',
            'Granulare RBAC-Rollen & Rechteverwaltung',
            'Omnichannel-Kampagnen & Automationen',
            'Priorisierter E-Mail- & Chat-Support',
            'Lebenslange Updates & neue Funktionen',
          ],
          cta: 'Pro-Lizenz wählen (149$)',
        },
        {
          id: 'unlimited',
          name: 'Unbegrenzte Lizenz',
          badge: 'BESTER WERT',
          price: 179,
          originalPrice: 1499,
          description:
            'Die ultimative Lösung für anspruchsvolle Unternehmen, Agenturen mit vielen Kunden und Scale-ups.',
          features: [
            'UNBEGRENZTE BENUTZER',
            'UNBEGRENZTE WORKSPACES (Multi-Client)',
            'Alle Funktionen der Pro-Lizenz',
            'Alle Omnichannel-Kanäle ohne Limit',
            'Hochpriorisierte VIP BullMQ Warteschlange',
            'Unbegrenzte KI-Engine (OpenAI / Gemini konfigurierbar)',
            'Vollständiges Audit-Log & DSGVO-Konformität',
            'Eigener REST-API & Webhook-Zugang',
            'Prioritäre Lizenzschlüssel-Zustellung',
            'Dediziertes Onboarding & 24/7 VIP-Support',
          ],
          cta: 'Unbegrenzte Lizenz wählen (179$)',
        },
      ],
    },
    comparison: {
      tag: 'DETAILVERGLEICH',
      title: 'Vergleichen Sie unsere 3 Lifetime-Lizenzen',
      subtitle: 'Vollständige technische Transparenz ohne Wenn und Aber.',
      features: [
        { category: 'Team & Zugriff', name: 'Benutzeranzahl', solo: '1 Benutzer', pro: '5 Benutzer', unlimited: 'Unbegrenzt' },
        { category: 'Team & Zugriff', name: 'Workspace-Anzahl', solo: '1 Workspace', pro: '3 Workspaces', unlimited: 'Unbegrenzt' },
        { category: 'Team & Zugriff', name: 'RBAC Rollen & Rechte', solo: false, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'WhatsApp Cloud API', solo: true, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'Meta Messenger Webhooks', solo: false, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'Professionelle E-Mail', solo: true, pro: true, unlimited: true },
        { category: 'Omnichannel', name: 'BullMQ Massenkampagnen', solo: false, pro: true, unlimited: true },
        { category: 'Künstliche Intelligenz', name: 'Automatische KI-Zusammenfassungen', solo: false, pro: true, unlimited: true },
        { category: 'Künstliche Intelligenz', name: 'Intelligente KI-Antworten', solo: false, pro: true, unlimited: true },
        { category: 'Infrastruktur', name: 'NestJS Backend + MongoDB', solo: true, pro: true, unlimited: true },
        { category: 'Infrastruktur', name: 'Asynchrone Redis-Warteschlange', solo: 'Standard', pro: 'Dediziert', unlimited: 'VIP-Priorität' },
        { category: 'Infrastruktur', name: 'REST-API & eigene Webhooks', solo: false, pro: false, unlimited: true },
        { category: 'Support & Updates', name: 'Lebenslange Updates', solo: true, pro: true, unlimited: true },
        { category: 'Support & Updates', name: 'Support-Level', solo: 'Standard', pro: 'Priorisiert', unlimited: '24/7 VIP' },
      ],
    },
    testimonials: {
      tag: 'KUNDENSTIMMEN',
      title: 'Erfolgreich von teuren Abos zu NextCRM gewechselt',
      subtitle: 'Erfahren Sie, warum über 1.200 Unternehmen auf das NextCRM LTD-Angebot setzen.',
      items: [
        {
          quote:
            'NextCRM spart uns über 2.500€ pro Jahr im Vergleich zu HubSpot. WhatsApp und E-Mail in einem gemeinsamen System zu haben, ist ein enormer Effizienzgewinn.',
          author: 'Sandra Weber',
          role: 'Vertriebsleiterin',
          company: 'Aura Growth Agency',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'Die Unlimited-Lizenz für 179$ ist unschlagbar. Die NestJS- und MongoDB-Infrastruktur reagiert ultraschnell, und BullMQ bewältigt unsere Aussendungen perfekt.',
          author: 'Markus Hoffmann',
          role: 'CTO & Gründer',
          company: 'NovaTech SaaS',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
        {
          quote:
            'Für meine Selbstständigkeit hat sich die 99$-Solo-Lizenz schon in der ersten Woche bezahlt gemacht. Endlich keine fixen Abogebühren mehr.',
          author: 'Klaus Lindner',
          role: 'B2B-Berater',
          company: 'Lindner Consulting',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          rating: 5,
        },
      ],
    },
    faq: {
      tag: 'HÄUFIG GESTELLTE FRAGEN',
      title: 'Wichtige Informationen zu unserem LTD-Angebot',
      subtitle: 'Maximale Transparenz: keine versteckten Gebühren, keine Überraschungen.',
      items: [
        {
          question: 'Was genau bedeutet "Lifetime Deal" (Lizenz auf Lebenszeit)?',
          answer:
            'Sie zahlen heute einmalig und erhalten dauerhaften Zugriff auf NextCRM, ohne jemals wiederkehrende Monats- oder Jahresgebühren zu zahlen. Alle zukünftigen Hauptupdates sind inklusive.',
        },
        {
          question: 'Gibt es versteckte monatliche Zusatzkosten?',
          answer:
            'Nein. Es gibt keinerlei Software-Abogebühren. Für WhatsApp Cloud API nutzen Sie die offizielle Meta-Schnittstelle (Meta gewährt jeden Monat 1.000 kostenlose Service-Konversationen).',
        },
        {
          question: 'Kann ich meine Lizenz später upgraden?',
          answer:
            'Ja! Sie können jederzeit von Solo auf Pro oder Unlimited upgraden, indem Sie während der Einführungsphase lediglich die Preisdifferenz begleichen.',
        },
        {
          question: 'Wie funktioniert die 30-Tage-Geld-zurück-Garantie?',
          answer:
            'Sollte NextCRM innerhalb der ersten 30 Tage nach dem Kauf nicht Ihren Erwartungen entsprechen, erhalten Sie auf einfache Anfrage den vollen Kaufbetrag erstattet.',
        },
        {
          question: 'Wie sind die Kundendaten geschützt?',
          answer:
            'NextCRM nutzt strikte Mandantentrennung auf MongoDB-Ebene über Workspace ObjectIds. Sämtliche Zugangsdaten und Kundendaten bleiben verschlüsselt und isoliert.',
        },
        {
          question: 'Wie erhalte und aktiviere ich meinen Lizenzschlüssel?',
          answer:
            'Direkt nach Abschluss der Bestellung wird Ihr Lizenzschlüssel (z. B. NXT-LTD-PRO-XXXX) sofort generiert und kann in Ihrem NextCRM-Workspace freigeschaltet werden.',
        },
      ],
    },
    checkoutModal: {
      title: 'Bestellung Ihrer Lifetime-Lizenz abschließen',
      subtitle: 'Sichere Abwicklung und sofortige Freischaltung Ihrer NextCRM-Lizenz',
      selectedPlan: 'Gewählte Lizenz',
      price: 'Gesamtpreis',
      oneTime: 'Einmalige Zahlung • Lebenslanger Zugriff',
      nameLabel: 'Vollständiger Name',
      emailLabel: 'Geschäftliche E-Mail-Adresse',
      workspaceNameLabel: 'Firmen- / Workspace-Name',
      confirmBtn: 'Bestätigen & Lizenzschlüssel generieren',
      closeBtn: 'Abbrechen',
      successTitle: '🎉 Herzlichen Glückwunsch! Ihre LTD-Lizenz ist aktiv',
      successMessage: 'Ihre Lizenz auf Lebenszeit wurde erfolgreich im NextCRM-System aktiviert.',
      licenseKeyLabel: 'Ihr offizieller Lizenzschlüssel:',
      launchAppBtn: 'Jetzt NextCRM-Workspace öffnen',
    },
    footer: {
      tagline: 'Das moderne Omnichannel-CRM mit NestJS, MongoDB & BullMQ.',
      rights: 'Alle Rechte vorbehalten. Offizielles NextCRM Lifetime Deal.',
      privacy: 'Datenschutz',
      terms: 'AGB',
      status: 'Server & Cloud-Systeme zu 99.99% betriebsbereit',
    },
  },
};
