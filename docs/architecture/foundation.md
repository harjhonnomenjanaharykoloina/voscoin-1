# NextCRM — Phase 2 Foundation Architecture & Target Stack

## 1. Official Architecture Decision

Following the comprehensive audit and official technical directive, **NextCRM** is architected on the following definitive stack:

```text
                         NEXTCRM
                            │
                            ▼
                    ┌─────────────────┐
                    │   ANGULAR 20    │
                    │    FRONTEND     │
                    └────────┬────────┘
                             │
                    HTTPS / REST API (api/v1)
                             │
                     WebSocket / Socket.IO
                             │
                             ▼
                    ┌─────────────────┐
                    │     NESTJS      │
                    │     BACKEND     │
                    │     NODE.JS     │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
         MongoDB           Redis          Storage (S3/MinIO)
          Prisma             │
                             ▼
                           BullMQ
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
          WhatsApp        Messenger        Email
              │
              ▼
         AI Provider
```

### Key Mandates
- **Frontend**: Angular 20 Standalone components with Angular Router, Tailwind CSS, and Lucide icons. (No Next.js migration).
- **Backend**: NestJS (Node.js runtime) delivering REST API and Socket.IO.
- **Database**: **MongoDB** with Prisma ORM. PostgreSQL is eliminated from the roadmap.
- **Queue Engine**: **Redis** + **BullMQ** for asynchronous background jobs and rate limiting.
- **Omnichannel**: WhatsApp Business API, Meta Messenger, and Email abstraction.
- **AI Abstraction**: Server-side provider interface (OpenAI / Gemini / Configurable).

---

## 2. Phase 2 Foundation Components

### 2.1 Backend Project Directory (`/backend`)
```text
backend/
├── src/
│   ├── main.ts                       # Application bootstrap (Helmet, CORS, ValidationPipe, AllExceptionsFilter)
│   ├── app.module.ts                 # Root dependency injection container
│   ├── config/
│   │   └── environment.ts            # Typed environment configuration
│   ├── infra/
│   │   ├── prisma/
│   │   │   ├── prisma.service.ts     # MongoDB connection lifecycle & tenantScope helper
│   │   │   └── prisma.module.ts      # Global Prisma database provider
│   │   └── redis/
│   │       ├── redis.module.ts       # IORedis connection provider
│   │       └── bullmq.module.ts      # BullMQ queue registry
│   ├── health/
│   │   ├── health.controller.ts      # /health endpoint checking MongoDB & Redis
│   │   └── health.module.ts
│   ├── auth/
│   │   ├── auth.service.ts           # Workspace + User registration & JWT generation
│   │   ├── auth.controller.ts        # /auth/register, /auth/login, /auth/refresh, /auth/me
│   │   ├── auth.types.ts             # Roles (OWNER, ADMIN, MANAGER, AGENT) & JWT payload
│   │   ├── dto/auth.dto.ts           # Class-validator schemas
│   │   └── guards/
│   │       ├── access-token.guard.ts # JWT verification & user attachment
│   │       └── auth-rate-limit.guard.ts # Redis IP-based rate limiter (10 req/min)
│   └── common/
│       └── filters/
│           └── http-exception.filter.ts # Production-safe error response filter
├── prisma/
│   └── schema.prisma                 # MongoDB schema with native ObjectId & tenant isolation
├── .env.example
├── package.json
├── nest-cli.json
└── tsconfig.json
```

---

## 3. Database Schema (MongoDB + Prisma)

All persistent collections enforce multi-tenancy through `workspaceId`:

| Model | Purpose | Multi-Tenancy Scope |
| :--- | :--- | :--- |
| **Workspace** | Primary tenant entity | Tenant boundary root |
| **User** | System users with RBAC | `workspaceId` index |
| **Team** | Sub-teams within workspace | `workspaceId` index |
| **Contact** | Leads, clients, WhatsApp/Email identities | `workspaceId` index |
| **Company** | Organization accounts | `workspaceId` index |
| **Pipeline & Stage** | Sales opportunity workflow | `workspaceId` index |
| **Deal** | Revenue opportunities linked to contacts/stages | `workspaceId` index |
| **Task** | Action items with priorities & due dates | `workspaceId` index |
| **Activity** | History timeline (calls, notes, emails) | `workspaceId` index |
| **ChannelAccount** | WhatsApp Business / Messenger credentials | `workspaceId` unique index |
| **Conversation** | Unified omnichannel message thread | `workspaceId` index |
| **Message** | Inbound/Outbound message payload & status | Referenced via Conversation |
| **Campaign** | Broadcast campaigns with delivery counters | `workspaceId` index |
| **AuditLog** | Immutable security trail of all actions | `workspaceId` index |

---

## 4. BullMQ Queue Topology

| Queue Name | Primary Trigger | Target Output |
| :--- | :--- | :--- |
| `send-whatsapp` | User reply or campaign trigger | WhatsApp Cloud API endpoint |
| `send-messenger` | Inbound auto-reply or agent send | Meta Graph API |
| `send-email` | Transactional/outreach trigger | SMTP / Resend provider |
| `process-webhook` | Meta/WhatsApp inbound webhook | Decrypt, route to conversation |
| `process-campaign` | Campaign schedule tick | Batch recipients & enqueue sends |
| `generate-ai-response` | Inbound message analysis | AI Provider summary & suggested reply |
| `notifications` | Deal won / mention in note | Socket.IO push to Angular |
| `analytics` | Event tracking aggregation | Real-time performance metrics |

---

## 5. Security Architecture

1. **Strict Server-Side Validation**:
   - `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` discards unexpected fields, neutralizing NoSQL operator injection (`$where`, `$gt`, etc.).
2. **Tenant Boundary Enforcement**:
   - All controller queries resolve `workspaceId` from the cryptographically verified JWT (`req.user.workspaceId`), completely preventing frontend spoofing.
3. **RBAC Guard**:
   - Hierarchy: `OWNER` > `ADMIN` > `MANAGER` > `AGENT`.
4. **Redis Rate Limiting**:
   - Protects sensitive authentication and API endpoints against brute force.
5. **No Secret Leakage**:
   - WhatsApp access tokens, Meta tokens, SMTP passwords, and AI keys are strictly server-side and never returned to client apps.

---

## 6. Development Phasing

- [x] **Phase 1**: Architecture Audit & Target Stack Finalization.
- [x] **Phase 2**: **Foundation (NestJS + Node.js + MongoDB + Prisma + Redis)** *(Completed)*.
- [ ] **Phase 3**: Authentication & Session Lifecycle.
- [ ] **Phase 4**: CRM Core (Contacts, Companies, Deals, Pipelines, Tasks).
- [ ] **Phase 5**: Teams, RBAC & Multi-workspace administration.
- [ ] **Phase 6**: Omnichannel Communications (WhatsApp, Messenger, Email).
- [ ] **Phase 7**: Realtime WebSocket & Live Inbox.
- [ ] **Phase 8**: BullMQ Workers & Background Processing.
- [ ] **Phase 9**: AI Provider Abstraction & Intelligence Features.
- [ ] **Phase 10**: Comprehensive Security & IDOR Audit.
- [ ] **Phase 11**: Automated Unit, Integration & E2E Tests.
- [ ] **Phase 12**: Docker, CI/CD & Production Hardening.
