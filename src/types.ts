export type UserRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'AGENT';

export type ChannelType = 'WHATSAPP' | 'MESSENGER' | 'EMAIL';

export type MessageDirection = 'INBOUND' | 'OUTBOUND';

export type MessageStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export type DealStatus = 'OPEN' | 'WON' | 'LOST';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  currency: string;
  timezone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  workspaceId: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappPhone?: string;
  companyName?: string;
  title?: string;
  status: 'LEAD' | 'QUALIFIED' | 'CUSTOMER' | 'CHURNED';
  tags: string[];
  workspaceId: string;
  assignedTo?: string;
  lastContactedAt: string;
}

export interface Deal {
  id: string;
  title: string;
  amount: number;
  stage: 'LEAD' | 'CONTACTED' | 'MEETING' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  probability: number;
  contactName: string;
  companyName: string;
  expectedCloseDate: string;
  workspaceId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: Priority;
  assignedToName: string;
  relatedContactName?: string;
  workspaceId: string;
}

export interface Message {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  content: string;
  status: MessageStatus;
  timestamp: string;
  senderName: string;
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  channel: ChannelType;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  channelIdentifier: string;
  lastMessageText: string;
  lastMessageAt: string;
  unreadCount: number;
  aiSummary?: string;
  messages: Message[];
  workspaceId: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: ChannelType;
  status: 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'COMPLETED';
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  scheduledDate: string;
  workspaceId: string;
}

export interface BullMqQueueInfo {
  name: string;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  status: 'ACTIVE' | 'IDLE' | 'PAUSED';
}
