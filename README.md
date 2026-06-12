# E-Exam UI

A React 19 single-page application for an online examination platform.  
Companion front-end to the [back-eExam](https://github.com/your-org/back-eExam) Laravel API.

Three roles — **Admin**, **Teacher** (Enseignant), **Student** (Étudiant) — with full CRUD for tests, questions, groups, announcements, and results, plus a real-time secured exam room with anti-cheat protection.

<p align="center">
  <img src="docs/login.png" alt="E-Exam UI - Login page" width="800" />
</p>

---

## Features

### Authentication & Authorisation
- JWT-based login / registration with persistent token in `localStorage`
- Client-side role extraction from JWT payload
- Route guards — `<RoleBasedRoute>` redirects unauthorised users to a 403 page
- Logout clears token and redirects to login

<p align="center">
  <img src="docs/login.png" alt="Login page" width="45%" />
  <img src="docs/signup.png" alt="Signup page" width="45%" />
</p>

### Teacher
- **Test management** — create, edit, delete, view tests; filter by status
- **Question bank** — add QCM (multiple choice), short answer, and essay questions; configure points
- **Test launch** — set a timer and launch a test for a group; students can then attempt it
- **Live correction** — list uncorrected responses, grade essay questions manually, auto-corrected score overview
- **Results dashboard** — interactive charts (ApexCharts) showing class performance, per-question stats
- **PDF generation** — download full result reports with student names, scores, and signatures
- **Announcements** — create / edit announcements per group
- **Profile** — view and update personal information
- **Navigation** — sidebar with role-specific links

<p align="center">
  <img src="docs/teacher_home.png" alt="Teacher dashboard" width="45%" />
  <img src="docs/teacher_test.png" alt="Test list" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_test_add.png" alt="Create test" width="45%" />
  <img src="docs/teacher_test_filter.png" alt="Filter tests" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_test_view.png" alt="Test detail" width="45%" />
  <img src="docs/teacher_qcm_view.png" alt="QCM view" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_question_add.png" alt="Add question" width="45%" />
  <img src="docs/teacher_question_edit.png" alt="Edit question" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_correction.png" alt="Correction page" width="45%" />
  <img src="docs/teacher_examen_launched.png" alt="Launched exam" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_result_view.png" alt="Result view" width="45%" />
  <img src="docs/teacher_result_pdf.png" alt="Result PDF" width="45%" />
</p>
<p align="center">
  <img src="docs/teacher_annonce.png" alt="Announcements" width="45%" />
  <img src="docs/teacher_profile.png" alt="Teacher profile" width="45%" />
</p>

### Student
- **Available tests** — see tests assigned to your group with status and timer
- **Secure exam room** — real‑time countdown timer, auto-submit on timeout, question navigation
- **Anti-cheat** — tab‑switch detection (2 violations → auto-submit), right‑click disabled, `beforeunload` guard, warning modal
- **Results** — view corrected tests with scores and feedback
- **Announcements** — read group announcements
- **Profile** — view personal details

<p align="center">
  <img src="docs/studet_home.png" alt="Student dashboard" width="45%" />
  <img src="docs/student_test.png" alt="Available tests" width="45%" />
</p>
<p align="center">
  <img src="docs/student_exam_room.png" alt="Exam room" width="45%" />
  <img src="docs/student_exam_alert.png" alt="Cheat warning" width="45%" />
</p>
<p align="center">
  <img src="docs/student_result.png" alt="Student results" width="45%" />
  <img src="docs/student_annonce.png" alt="Student announcements" width="45%" />
</p>
<p align="center">
  <img src="docs/student_profile.png" alt="Student profile" width="45%" />
</p>

### Admin
- **User approval workflow** — approve or block pending teacher/student accounts
- **Group management** — full CRUD for class groups
- **Result oversight** — view all results across groups, publish/download result files
- **History & corrections** — view all tests, responses, and corrections platform-wide

<p align="center">
  <img src="docs/admin_home.png" alt="Admin dashboard" width="45%" />
  <img src="docs/admin_account.png" alt="User accounts" width="45%" />
</p>
<p align="center">
  <img src="docs/admin_account_filter.png" alt="Filter accounts" width="45%" />
  <img src="docs/admin_group.png" alt="Group management" width="45%" />
</p>
<p align="center">
  <img src="docs/admin_group_add.png" alt="Add group" width="45%" />
  <img src="docs/admin_group_edit.png" alt="Edit group" width="45%" />
</p>
<p align="center">
  <img src="docs/admin_history.png" alt="History" width="45%" />
  <img src="docs/admin_history_view.png" alt="History detail" width="45%" />
</p>
<p align="center">
  <img src="docs/admin_history_pdf.png" alt="History PDF" width="45%" />
  <img src="docs/admin_response_view.png" alt="Response view" width="45%" />
</p>
<p align="center">
  <img src="docs/admin_result.png" alt="Results" width="45%" />
  <img src="docs/admin_result_add.png" alt="Add result" width="45%" />
</p>

### General
- Role‑specific dashboards with quick‑action cards
- Toast notifications for all CRUD operations (success / error)
- Fully responsive layout (sidebar collapses for mobile)
- Custom 404 and 403 error pages

---

## Modern & Advanced React Features

| Feature | Usage |
|---------|-------|
| **React 19** | `react@19.0.0` — latest stable with `createRoot` API |
| **TypeScript (strict)** | Every component typed; interfaces for all data models, typed props, enums for roles & question types, generics in custom hooks |
| **React.lazy + Suspense** | All 20+ page components lazy‑loaded; wrapped in `<Suspense>` with loading spinner — zero monolithic imports |
| **Error Boundary** | Class‑based `ErrorBoundary` at the App root using `getDerivedStateFromError` / `componentDidCatch`; fallback UI with a recovery button |
| **TanStack React Query v5** | All server state managed via `useQuery` (caching, `staleTime: Infinity`, `enabled` guard) and `useMutation` (onSuccess → toast + cache invalidation, onError → status‑specific error messages) |
| **React Router v7** | `<BrowserRouter>`, nested `<Routes>` with `<Outlet>` for role layouts, `useNavigate` / `useParams` / `useLocation`, route guards via `<RoleBasedRoute>` |
| **Context API** | `AuthContext` — stores JWT token, provides `login` / `logout` / `isAuthenticated`; `TestContext` — tracks exam timer (`secondsLeft`, `isFinished`, `startCountdown`) |
| **Axios interceptors** | 3 pre‑configured instances: `axiosAuthInstance` (Bearer token header), `axiosInstance` (public), `axiosMutlipartFormDataInstance` (auth + multipart); plus a download instance for blob responses |
| **react-hook-form + yup** | All forms use `<Controller>` with `yupResolver`; Yup schemas with French error messages for every entity (test, question, option, group, announcement, response, user) |
| **Code splitting** | Route‑based via `React.lazy()` — built chunks are per‑route, not per‑page |
| **shadcn/ui + Radix Primitives** | Accessible headless UI components: `@radix-ui/react-dialog`, `-select`, `-popover`, `-alert-dialog`, `-label`, `-slot`, `-separator`; all wrapped in Tailwind‑styled shadcn/ui components |
| **class-variance-authority** | `cva()` — used by `Button` component for variant / size variants |
| **clsx + tailwind-merge (`cn()`)** | `cn()` utility in `lib/utils.ts` for conditional class merging |
| **Tailwind CSS v4** | `@theme` for custom colour palette, `@custom-variant dark` for dark mode, `@font-face` for 6 font families (Geist, GeistMono, HostGrotesk, Prompt, Lato, Roboto), `tailwind-clip-path` plugin |
| **lucide-react** | Primary icon library (tree‑shakeable, consistent style) |
| **react-toastify** | `showToast()` helper wrapping toast notifications — success (green) / error (red) messages for all API calls |
| **react-apexcharts** | Interactive bar/donut charts on teacher result views — per‑question scores, class distribution |
| **@react-pdf/renderer** | Client‑side PDF generation — full result document with styled table, header, audience list, and signature block |
| **Typed.js** | Typewriter animation on the student dashboard landing |
| **dayjs + date-fns** | Date range helpers (week / month / year), PDF date formatting, ISO string conversion with timezone |
| **30+ custom hooks (domain‑separated)** | `useGetTestById`, `usePostQuestion`, `useDeleteGroup`, `useLaunchTest`, `useGetAllResultByGroupId`, etc. — each wraps TanStack Query + error/toast logic in a consistent pattern |
| **Custom event‑driven anti‑cheat** | `visibilitychange` tab‑switch detection, `contextmenu` (right‑click) prevention, `beforeunload` guard — all in `TestRoom.tsx` |
| **Environment variables** | `VITE_BASE_URL` via `import.meta.env` — single `.env` file |
| **ESLint v9 (flat config)** | `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` + `typescript-eslint` |
| **Prettier** | `npm run format` — consistent code formatting across the project |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.7 (strict) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Server state | TanStack React Query v5 |
| Routing | react-router-dom v7 |
| Forms | react-hook-form + yup |
| HTTP | Axios (3 instances + interceptors) |
| Charts | react-apexcharts |
| PDF | @react-pdf/renderer |
| Icons | lucide-react + @ant-design/icons |
| Notifications | react-toastify |
| Animation | Typed.js |
| Dates | dayjs + date-fns |
| Linting | ESLint v9 (flat config) + Prettier |

## Architecture & Data Flow

```
User Action
  │
  ▼
Page Component (React.FC)
  │
  ▼
Custom Hook (useQuery / useMutation)
  │  ├── fires API call via Axios instance
  │  ├── manages loading / error / success states
  │  └── shows toast notification on error
  │
  ▼
API Service (axiosAuthInstance)
  │  ├── Bearer token injected by interceptor
  │  └── Base URL: VITE_BASE_URL
  │
  ▼
Laravel Backend (back-eExam)
  │  └── http://localhost:8000/api
  │
  ▼
Response → React Query cache → Re-render → Toast success
```

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- The [back-eExam](https://github.com/your-org/back-eExam) Laravel API running on `http://localhost:8000`

### Installation

```bash
# 1. Clone
git clone <repo-url> E-examUI
cd E-examUI

# 2. Install dependencies
npm install

# 3. Configure environment
#    Edit .env if your API runs on a different URL:
#    VITE_BASE_URL=http://localhost:8000/api

# 4. Start the dev server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then production build |
| `npm run lint` | Run ESLint v9 flat config |
| `npm run format` | Format code with Prettier |
| `npm run preview` | Preview production build locally |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_BASE_URL` | `http://localhost:8000/api` | Laravel API base URL |

---

## Companion Backend

This front-end requires the [back-eExam](https://github.com/your-org/back-eExam) Laravel API.  
Refer to its README for installation and configuration instructions.

---

## License

This project is open‑sourced under the MIT license.
