# industrialvisit — Industrial Inventory Management System

A premium, production-ready SaaS web application for industrial inventory management built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@industrialvisit.com | Admin@123 |
| **Manager** | manager@industrialvisit.com | Manager@123 |
| **Employee** | employee@industrialvisit.com | Employee@123 |

---

## 📁 Project Structure

```
industrialvisit/
├── app/
│   ├── (landing)/         # Public landing page
│   ├── login/             # Authentication
│   ├── forgot-password/   # Password recovery
│   └── dashboard/         # Protected dashboard
│       ├── page.tsx        # Main KPI dashboard
│       ├── analytics/      # Advanced charts
│       ├── products/       # Product CRUD
│       ├── categories/     # Category management
│       ├── suppliers/      # Supplier management
│       ├── stock-in/       # Incoming stock
│       ├── stock-out/      # Outgoing stock
│       ├── purchase-orders/# PO management
│       ├── reports/        # Report generation
│       ├── users/          # User management (Admin)
│       ├── profile/        # User profile
│       └── audit-logs/     # Activity trail
├── components/
│   ├── providers/          # React providers
│   └── shared/             # Reusable components
├── lib/
│   ├── db.ts               # Prisma client
│   ├── utils.ts            # Utility functions
│   └── mock-data.ts        # Demo data
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Demo data seeder
└── types/
    └── index.ts            # TypeScript types
```

---

## 🗄️ Database Setup (Optional)

This app works with **mock data by default**. To connect a real database:

### Option A — Supabase (Recommended, Free)
1. Create a project at [supabase.com](https://supabase.com)
2. Copy the connection string from Project Settings → Database
3. Add to `.env.local`: `DATABASE_URL="postgresql://..."`

### Option B — Neon (Free)
1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Add to `.env.local`

### After connecting:
```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Add demo data
```

---

## ✨ Features

- **Dashboard** — KPI cards, 4 chart types, low stock alerts, recent activity
- **Products** — Full CRUD, search, filter, pagination, SKU generation, QR code
- **Categories** — CRUD with card grid layout
- **Suppliers** — CRUD with GST number support
- **Stock In/Out** — Record transactions with validation
- **Purchase Orders** — Create, track, update status
- **Reports** — 4 report types, PDF/Excel/CSV export buttons
- **User Management** — Role-based access (Admin/Manager/Employee)
- **Profile** — Edit profile, change password
- **Audit Logs** — Complete activity trail
- **Analytics** — Advanced charts page
- **Dark/Light Mode** — Full theme support
- **Responsive** — Works on mobile, tablet, and desktop
- **Landing Page** — World-class marketing page for client demos

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS Design System
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js v5
- **Notifications**: Sonner

---

## 📝 License

Built for portfolio demonstration purposes. © 2024 industrialvisit.
