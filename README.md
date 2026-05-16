# Insight Dashboard – Next.js App Router

Et analytisk salgsdashboard bygget med Next.js App Router, der demonstrerer implementeringen af Server-Side Rendering (SSR) og Client-Side Rendering (CSR) i praksis.

Dette projekt er udviklet som en del af specialiseringssynopsen på PBA Web Development, 6. semester, Zealand – Sjællands Erhvervsakademi (2026).

---

## Om projektet

Dashboardet visualiserer salgsdata for en fiktiv tøjwebshop og demonstrerer tydeligt forskellen på Server Components og Client Components i Next.js App Router.

Projektet er én af to prototyper der sammenlignes i synopsen:

- **Denne prototype** – Next.js App Router med Server og Client Components
- **React prototype** – Ren React med Vite og Node.js/Express

---

## Teknologier

| Teknologi | Version | Formål |
|---|---|---|
| Next.js | 16.2.6 | Framework med App Router |
| React | 19.2.4 | UI bibliotek |
| TypeScript | 5.x | Statisk typning |
| Tailwind CSS | 3.x | Styling |
| Supabase | Latest | PostgreSQL database og API |
| Recharts | Latest | Datavisualisering |

---

## Funktioner

- **KPI kort** – Omsætning, ordrer, kunder og gennemsnitlig ordreværdi
- **Søjlegraf** – Månedlig omsætning over tid
- **Kategori oversigt** – Salg fordelt på tøjkategorier med progress bars
- **Ordretabel** – Seneste ordrer med søgefunktion
- **Periodefilter** – Filtrer data på uge, måned, kvartal eller år
- **Responsivt layout** – Fungerer på både desktop og mobil

---

## Arkitektur – Server vs Client Components

Et centralt fokus i dette projekt er opdelingen af komponenter:

### Server Components (SSR)
Renderes på serveren. Data hentes direkte fra Supabase uden at API-nøgler eksponeres i browseren.

```
src/components/server/
├── Sidebar.tsx       – Navigation (ingen JavaScript sendes til browser)
├── KPICards.tsx      – Henter KPI data fra Supabase på serveren
└── OrdersTable.tsx   – Henter ordrer fra Supabase på serveren
```

### Client Components (CSR)
Kræver browseren på grund af interaktivitet eller browser-specifikke APIs.

```
src/components/client/
├── NavItem.tsx        – Aktiv navigation state (usePathname)
├── FilterBar.tsx      – Periodefilter (useRouter, useSearchParams)
├── RevenueChart.tsx   – Recharts graf (kræver browser canvas)
├── CategoryList.tsx   – Kategori data med useEffect
├── OrdersSearch.tsx   – Søgefunktion (useState)
└── MobileHeader.tsx   – Hamburger menu (useState)
```

---

## Projektstruktur

```
sales-dashboard-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          – Root layout med Sidebar og MobileHeader
│   │   ├── page.tsx            – Dashboard side
│   │   └── globals.css         – Global CSS med Tailwind direktiver
│   ├── components/
│   │   ├── server/             – Server Components
│   │   └── client/             – Client Components
│   └── lib/
│       └── supabase.ts         – Supabase klient konfiguration
├── tailwind.config.js          – Tailwind konfiguration med design tokens
├── .env.local                  – Miljøvariabler (ikke i version control)
└── README.md
```

---

## Database struktur

Projektet bruger Supabase (PostgreSQL) med følgende tabeller:

```
categories    – Tøjkategorier
customers     – Kundedata
products      – Produkter med kategori og pris
orders        – Ordrer med foreign keys til customers og products
```

---

## Kom i gang

### Forudsætninger

- Node.js 18+
- En Supabase konto og projekt

### Installation

1. Klon repositoriet:
```bash
git clone https://github.com/dit-brugernavn/sales-dashboard-nextjs.git
cd sales-dashboard-nextjs
```

2. Installer dependencies:
```bash
npm install
```

3. Opret `.env.local` i roden af projektet:
```
NEXT_PUBLIC_SUPABASE_URL=din-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-nøgle
```

4. Start udviklingsserveren:
```bash
npm run dev
```

5. Åbn browseren på `http://localhost:3000`

---

## Miljøvariabler

| Variabel | Beskrivelse |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL til dit Supabase projekt |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public nøgle fra Supabase |

> **Bemærk:** `.env.local` må aldrig pushes til version control. Filen er allerede tilføjet til `.gitignore`.

---

## Hvorfor Next.js frem for ren React?

Et centralt spørgsmål i synopsen er hvornår Next.js giver mening frem for ren React. Dette projekt demonstrerer tre konkrete fordele:

**1. Sikkerhed**
API-nøgler til Supabase eksponeres aldrig i browseren da datahentning sker i Server Components på serveren.

**2. Performance**
KPI kort og ordretabel er Server Components der sender færdig HTML til browseren – brugeren ser indhold med det samme uden at vente på JavaScript.

**3. Simplicitet**
SSR er standard i Next.js App Router – ingen manuel konfiguration af Express server eller `renderToString` som kræves i ren React.

---

## Live demo

🔗 https://sales-dashboard-nextjs-eta.vercel.app/

---

## Udviklet af

Emma Øhlers Frederiksen  
PBA Web Development, 6. semester  
Zealand – Sjællands Erhvervsakademi  
Forår 2026