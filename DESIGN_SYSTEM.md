# HotSOS Design System

> Product: HotSOS Room Dashboard (hospital / housekeeping operations)  
> Stack: React + Vite · Tailwind CSS v4 · shadcn/ui (New York) · Lucide · Radix  
> Inspiration: Linear · Vercel · Stripe · Apple Health  
> Status: **Design System only** — no page redesign in this document. Business logic stays untouched.

---

## 1. Design principles

| Principle | Meaning in HotSOS |
|---|---|
| Clarity first | Room status must be scannable in under 1 second |
| Calm enterprise | Neutral surfaces, restrained accent, no visual noise |
| Semantic color | Color means status — never decoration |
| Minimal chrome | Prefer border + whitespace over shadow + gradient |
| Reuse over invent | Extend shadcn variants; do not invent one-off styles |
| Separate concerns | UI tokens/components ≠ classify / colorGroup / API logic |

**Do**

- Use semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`)
- Prefer 1 primary action per view region
- Keep density high for room grids, airy for page chrome

**Don’t**

- Generic CRUD layouts with heavy tables-as-default
- Rainbow UI or random Tailwind palette picks
- Heavy drop shadows, glassmorphism, loud gradients
- Change `tileState` / `colorGroup` mapping for visual preference alone

---

## 2. Current baseline (audit)

| Area | Current state | Design System target |
|---|---|---|
| Theme | Partial `@theme inline` in `apps/web/src/index.css` | Full semantic token set + room status aliases |
| Font | System / Segoe / JP stack | Geist or Inter + JP fallback |
| Radius | `sm/md/lg` only | Full scale from base `--radius` |
| Shadow | Ad-hoc (`shadow-sm`, `shadow-md`) | Soft enterprise elevation ladder |
| Spacing | Mixed utilities | Strict 8px scale |
| Components | Button, Badge, Select, Tooltip | Extend via shadcn; document Card / Form / Table patterns |
| Room colors | Hex in `@hotsos/shared` `GROUP_HEX` | Keep domain hex; surface as CSS aliases for UI chrome only |

---

## 3. Color palette

### 3.1 Brand & semantic UI (OKLCH)

Light mode values — map into `:root` then expose via `@theme inline` (shadcn v4 pattern).

| Token | Role | Value (OKLCH) | Tailwind |
|---|---|---|---|
| `background` | App canvas | `oklch(0.985 0.004 255)` | `bg-background` |
| `foreground` | Primary text | `oklch(0.22 0.02 255)` | `text-foreground` |
| `card` | Elevated surface | `oklch(1 0 0)` | `bg-card` |
| `card-foreground` | Text on card | `oklch(0.22 0.02 255)` | `text-card-foreground` |
| `popover` | Overlay surface | `oklch(1 0 0)` | `bg-popover` |
| `popover-foreground` | Text on popover | `oklch(0.22 0.02 255)` | `text-popover-foreground` |
| `primary` | Brand / primary CTA | `oklch(0.45 0.14 255)` | `bg-primary` |
| `primary-foreground` | On primary | `oklch(0.98 0.01 255)` | `text-primary-foreground` |
| `secondary` | Quiet fill | `oklch(0.96 0.01 255)` | `bg-secondary` |
| `secondary-foreground` | On secondary | `oklch(0.28 0.03 255)` | `text-secondary-foreground` |
| `muted` | Subtle fill / skeleton | `oklch(0.96 0.008 255)` | `bg-muted` |
| `muted-foreground` | Secondary text | `oklch(0.52 0.02 255)` | `text-muted-foreground` |
| `accent` | Hover / selected wash | `oklch(0.95 0.02 255)` | `bg-accent` |
| `accent-foreground` | On accent | `oklch(0.28 0.03 255)` | `text-accent-foreground` |
| `destructive` | Danger / error | `oklch(0.55 0.20 25)` | `bg-destructive` |
| `success` | Positive system state | `oklch(0.55 0.14 155)` | `bg-success` / `text-success` |
| `warning` | Caution system state | `oklch(0.75 0.14 75)` | `bg-warning` / `text-warning` |
| `border` | Default stroke | `oklch(0.90 0.01 255)` | `border-border` |
| `input` | Control stroke | `oklch(0.90 0.01 255)` | `border-input` |
| `ring` | Focus ring | `oklch(0.55 0.10 255)` | `ring-ring` |

**Semantic mapping (UI chrome)**

| Intent | Token |
|---|---|
| Primary brand | Blue (`primary`) |
| Success | Emerald (`success`) |
| Warning | Amber (`warning`) |
| Danger | Rose (`destructive`) |
| Neutral | Slate family (`muted`, `border`, `foreground`) |

Never use random hues for chrome. Room tiles are the only place multi-hue status colors are allowed.

### 3.2 Room status colors (domain — do not restyle arbitrarily)

Source of truth remains `@hotsos/shared` → `GROUP_HEX` / `colorGroup`. UI should consume these, not redefine business meaning.

| `colorGroup` | Label | Hex | Usage |
|---|---|---|---|
| `out_pending` | Out · chưa out | `#5c3317` | Due Out / chưa checkout |
| `out` | Out | `#ef4444` | Out, chưa dọn |
| `out_clean` | Out · đã dọn | `#3b82f6` | Out + clean |
| `out_inspected` | Out · đã check | `#22c55e` | Out + inspected |
| `stay` | Stay | `#1e3a8a` | Stay Over (default) |
| `stay_clean` | Stay · đã dọn | `#06b6d4` | Stay + clean |
| `touchup` | Touch Up | `#a855f7` | Touch Up task |
| `none` | Phòng sạch | `#9ca3af` | No task / sạch |

**Contrast rule:** Room tile text is always white (`#fff`) on status fills. Minimum tile size stays large enough for legibility (see Card / Tile guideline).

### 3.3 Tailwind v4 token wiring (target)

```css
@import "tailwindcss";

:root {
  --background: oklch(0.985 0.004 255);
  --foreground: oklch(0.22 0.02 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.22 0.02 255);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.02 255);
  --primary: oklch(0.45 0.14 255);
  --primary-foreground: oklch(0.98 0.01 255);
  --secondary: oklch(0.96 0.01 255);
  --secondary-foreground: oklch(0.28 0.03 255);
  --muted: oklch(0.96 0.008 255);
  --muted-foreground: oklch(0.52 0.02 255);
  --accent: oklch(0.95 0.02 255);
  --accent-foreground: oklch(0.28 0.03 255);
  --destructive: oklch(0.55 0.20 25);
  --success: oklch(0.55 0.14 155);
  --warning: oklch(0.75 0.14 75);
  --border: oklch(0.90 0.01 255);
  --input: oklch(0.90 0.01 255);
  --ring: oklch(0.55 0.10 255);
  --radius: 0.625rem; /* 10px */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}
```

---

## 4. Typography scale

### 4.1 Font stack

| Role | Family |
|---|---|
| UI (preferred) | `Geist` or `Inter` |
| Fallback (JP + system) | `"Hiragino Sans", "Noto Sans JP", system-ui, sans-serif` |
| Numeric / room numbers | Same family · `font-semibold` · `tabular-nums` where counting |

### 4.2 Type ramp

| Token | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 30px / `text-3xl` | 1.2 | 600 | `-0.025em` | Rare hero only |
| `title` | 24px / `text-2xl` | 1.25 | 600 | `-0.025em` | Page title (`Room Dashboard`) |
| `heading` | 16px / `text-base` | 1.4 | 600 | `normal` | Section titles (floor groups) |
| `body` | 14px / `text-sm` | 1.5 | 400 | `normal` | Default body, filters, messages |
| `label` | 12px / `text-xs` | 1.4 | 500 | `normal` | Legend, meta, badge text |
| `overline` | 11–12px / `text-xs` | 1.3 | 500 | `0.16–0.2em` · uppercase | Product eyebrow (`HOTSOS`) |
| `mono-num` | 12–14px | 1 | 600 | `tight` | Room tile numbers |

**Weight budget:** prefer `400 / 500 / 600` only. Avoid stacking many bold weights on one screen.

**Hierarchy recipe (dashboard)**

1. Overline (muted)  
2. Title (foreground)  
3. Meta line (muted, `text-sm`)  
4. Section heading (`text-sm font-semibold`)  
5. Supporting counts (`text-xs text-muted-foreground`)

---

## 5. Radius

Base: `--radius: 0.625rem` (10px) — matches modern shadcn scale.

| Token | Value | Use |
|---|---|---|
| `radius-sm` | ~6px | Inputs dense, legend swatches, chips |
| `radius-md` | ~8px | Buttons, badges, selects, room tiles |
| `radius-lg` | 10px | Cards, panels, alert banners |
| `radius-xl` | ~14px | Large feature cards / empty states |
| `radius-2xl` | ~18px | Rare — modal shells only |
| `full` | 9999px | Avatars / pills only (not room tiles) |

**Guideline:** Room tiles use `rounded-md`. Floor/section cards use `rounded-xl` or `rounded-2xl`. Avoid mixing `rounded-full` with status tiles (reduces scanability).

---

## 6. Shadows

Premium SaaS elevation = **border first, shadow second**. Prefer Stripe/Linear softness.

| Token | CSS | When |
|---|---|---|
| `shadow-none` | none | Default cards on light canvas |
| `shadow-xs` | `0 1px 2px rgb(15 23 42 / 0.04)` | Subtle lift on controls |
| `shadow-sm` | `0 1px 2px rgb(15 23 42 / 0.05), 0 1px 3px rgb(15 23 42 / 0.06)` | Buttons hover optional; room tile resting |
| `shadow-md` | `0 4px 12px rgb(15 23 42 / 0.08)` | Popovers, dropdowns, tooltips |
| `shadow-lg` | `0 12px 32px rgb(15 23 42 / 0.12)` | Modals / drawers only |

**Rules**

- Default surface = `bg-card` + `border-border` + `shadow-none`
- Never stack heavy shadow + strong gradient
- Hover elevation: `shadow-xs` → `shadow-sm` max, 150–200ms

---

## 7. Spacing system (8px)

Base unit: **8px**. Allowed intermediates: `4px` (`0.5`) for tight clusters only.

| Token | px | Tailwind | Use |
|---|---|---|---|
| `space-0.5` | 4 | `gap-1` / `p-1` | Tile gaps, icon padding |
| `space-1` | 8 | `gap-2` / `p-2` | Compact stacks |
| `space-1.5` | 12 | `gap-3` / `p-3` | Control groups |
| `space-2` | 16 | `gap-4` / `p-4` | Card padding (compact) |
| `space-3` | 24 | `gap-6` / `p-6` | Page sections, card padding |
| `space-4` | 32 | `gap-8` / `p-8` | Major page blocks |
| `space-6` | 48 | `gap-12` | Rare vertical rhythm |
| `space-8` | 64 | `gap-16` | Marketing-scale only (avoid in ops UI) |

**Page shell (recommended)**

- Max width: `max-w-7xl`
- Horizontal padding: `px-4` → `sm:px-6`
- Vertical padding: `py-6`
- Section gap: `gap-6` (24px)

**Room grid**

- Tile gap: `gap-1.5` (6px) — only approved non-8 intermediate for dense ops density
- Floor block gap: `gap-6`

---

## 8. Border system

| Token | Width | Color | Use |
|---|---|---|---|
| `border` | 1px | `border-border` | Default cards, dividers |
| `border-input` | 1px | `border-input` | Form controls |
| `border-strong` | 1px | `foreground/15` | Emphasis separators |
| `border-danger` | 1px | `destructive/30` | Error callouts |
| `border-0` | 0 | — | Status-filled tiles (fill carries meaning) |
| `divide-y` | 1px | `divide-border` | Table / list rows |

**Rules**

- Prefer hairline borders over shadows for structure
- Do not use colored decorative borders on every card
- Focus: `ring-2 ring-ring` (+ optional `ring-offset-2 ring-offset-background`)
- Dashed borders only for empty drop targets / placeholders

---

## 9. Icon guideline

| Rule | Spec |
|---|---|
| Library | **Lucide React** only (matches shadcn) |
| Default size | `16px` (`h-4 w-4`) in buttons / meta |
| Compact | `14px` (`h-3.5 w-3.5`) in dense chips |
| Large | `20px` (`h-5 w-5`) empty states only |
| Stroke | Keep Lucide default; do not mix icon packs |
| Color | Inherit text color; muted icons use `text-muted-foreground` |
| Alignment | Inline with label via `inline-flex items-center gap-2` |
| Motion | Spin only for loading (`RefreshCw` + `animate-spin`) |
| Status | Prefer color swatch / badge for room status — icons are secondary |

**Recommended ops icons**

- Refresh / sync: `RefreshCw`
- Filter: `ListFilter` / `Filter`
- Floor / building: `Layers`
- Alert: `AlertCircle`
- Empty: `Inbox`
- Success session: `CheckCircle2`

Avoid emoji as UI icons.

---

## 10. Animation guideline

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-fast` | 150ms | `ease-out` | Hover color, border |
| `motion-base` | 200ms | `ease-out` | Fade / scale enter |
| `motion-slow` | 250ms | `ease-in-out` | Panel expand (rare) |

**Approved motions**

- Fade: opacity `0 → 1`
- Scale: `0.98 → 1` (overlays) or tile hover `scale-105` max
- Elevation: shadow step up one level
- Spin: loading indicators only

**Forbidden**

- Bounce / elastic on ops screens
- Continuous decorative pulse on many tiles
- Parallax, blur thrash, layout-jank animations
- Motions > 300ms for micro-interactions

**Tailwind v4 example**

```css
@theme {
  --animate-fade-in: fade-in 200ms ease-out;

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(2px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

`prefers-reduced-motion: reduce` → disable non-essential transitions.

---

## 11. Card guideline

### 11.1 Anatomy

```
┌─────────────────────────────────────────┐
│ Header (title + optional meta/action)   │
│─────────────────────────────────────────│
│ Body (content, 16–24px padding)         │
│ Footer (optional, muted actions)        │
└─────────────────────────────────────────┘
```

### 11.2 Variants

| Variant | Classes (intent) | Use |
|---|---|---|
| `surface` | `rounded-xl border border-border bg-card` | Default panel |
| `soft` | `rounded-xl bg-muted/50` | Nested grouping without hard edge |
| `interactive` | surface + `hover:bg-accent/40 transition-colors` | Clickable summary cards |
| `danger` | `rounded-lg border border-destructive/30 bg-destructive/5` | Errors |
| `stat` | compact surface + tight padding | KPI / count chips (StatsRow) |

### 11.3 Rules

- Padding: `p-4` (compact) or `p-6` (comfortable)
- Header/body gap: `gap-3`–`gap-4`
- One primary action max in card header
- Room tiles are **not** cards — they are status chips (`h-10 min-w-10 rounded-md`)
- Floor sections: light header + content; wrap in `surface` only if the whole floor needs a container

---

## 12. Form guideline

Built on shadcn + Radix. Keep controls calm and predictable.

### 12.1 Control sizes

| Size | Height | Text | Use |
|---|---|---|---|
| `sm` | 32px (`h-8`) | `text-xs` | Dense toolbars |
| `md` | 36px (`h-9`) | `text-sm` | **Default** (matches current Select/Button) |
| `lg` | 40px (`h-10`) | `text-sm` | Rare emphasis |

### 12.2 Field anatomy

1. Label — `text-xs font-medium text-foreground`
2. Control — `h-9 rounded-md border-input bg-card`
3. Hint — `text-xs text-muted-foreground`
4. Error — `text-xs text-destructive`

### 12.3 States

| State | Treatment |
|---|---|
| Default | `border-input bg-card` |
| Hover | slightly darker border or `bg-accent/30` |
| Focus | `ring-2 ring-ring` (never color-only focus) |
| Disabled | `opacity-50 cursor-not-allowed` |
| Invalid | `border-destructive` + error text |
| Loading | disable submit; show spinner in primary button |

### 12.4 Layout

- Vertical field stack: `space-y-2` inside field, `space-y-4` between fields
- Toolbar filters (dashboard): horizontal `flex flex-wrap gap-3`, fixed widths (`w-40`, `w-56`)
- Labels above fields on mobile; inline only for compact filter bars when space allows
- Primary submit right-aligned in footers; destructive actions separated

### 12.5 Components to prefer

- `Button` variants: `default` · `secondary` · `outline` · `ghost`
- `Select` for finite enums (floor, colorGroup)
- Native text input via shadcn `Input` when added
- Never invent a custom dropdown when Radix Select exists

---

## 13. Table guideline

HotSOS is dashboard-first; tables appear for assignments, audit, or detail views — not as the default room map.

### 13.1 Structure

| Part | Spec |
|---|---|
| Container | `rounded-xl border border-border bg-card overflow-hidden` |
| Header | `bg-muted/40 text-xs font-medium text-muted-foreground` |
| Row | `text-sm border-b border-border last:border-0` |
| Cell padding | `px-3 py-2.5` (compact ops) or `px-4 py-3` |
| Hover | `hover:bg-muted/40` |
| Selected | `bg-accent` |
| Sticky header | optional for long lists (`sticky top-0 z-10`) |

### 13.2 Density

| Density | Row height | Use |
|---|---|---|
| Compact | ~36–40px | Ops lists |
| Comfortable | ~44–48px | Admin / settings |

### 13.3 Content rules

- Numbers: `tabular-nums text-right`
- Status: Badge or status swatch — not raw English enums when localized labels exist
- Actions: rightmost column, `ghost` / `outline` icon buttons
- Empty: centered muted message + optional reset-filters action
- Loading: skeleton rows (`bg-muted animate-pulse`), not spinners in every cell
- Sorting: indicate with Lucide `ArrowUpDown` / directional arrows; keep header click targets ≥ 32px

### 13.4 When NOT to use a table

- Floor room overview → keep tile grid
- Single KPI → use Stat card / Badge row
- ≤ 3 attributes → definition list or card meta

---

## 14. Component foundation (shadcn/ui)

| Layer | Choice |
|---|---|
| Style | New York |
| Base color | Slate |
| Icons | Lucide |
| Primitives | Radix |
| Variants | `class-variance-authority` |
| Class merge | `cn()` (`clsx` + `tailwind-merge`) |

**Extension policy**

1. Check `components/ui/*` and existing feature components  
2. Add shadcn primitive if missing (`Card`, `Input`, `Table`, `Alert`, …)  
3. Build feature components (`RoomTile`, `FloorRow`, `StatsRow`) on tokens — not hard-coded one-offs  
4. Domain colors stay in `@hotsos/shared`; UI chrome uses CSS variables

---

## 15. Accessibility checklist

- Focus visible on all interactive elements (`ring-ring`)
- Tooltip content duplicates essential status (not the only source)
- Color is not the only status cue — legend + label + tooltip text
- Room tile buttons are real `<button>` with keyboard focus
- Contrast: body text on `background` / `card` ≥ WCAG AA
- Status fills with white text must keep luminance contrast
- Honor `prefers-reduced-motion`
- Provide loading and empty states for every data view

---

## 16. Implementation map (tokens → files)

| Concern | Own here | Do not touch for visuals alone |
|---|---|---|
| UI tokens | `apps/web/src/index.css` | — |
| Primitives | `apps/web/src/components/ui/*` | — |
| Feature UI | `apps/web/src/components/*`, `pages/*` | — |
| Room classification | — | `packages/shared/src/classify.ts` |
| Status hex / groups | consume only | `packages/shared/src/colors.ts` |
| API / auth | — | `apps/api/**` |

---

## 17. Definition of done (future UI work)

Before closing any visual pass:

- [ ] Uses semantic tokens (no random palette)
- [ ] 8px spacing rhythm respected
- [ ] Responsive at mobile / tablet / desktop
- [ ] Loading state present
- [ ] Empty state present
- [ ] Focus / keyboard OK
- [ ] Room status still matches shared `colorGroup` logic
- [ ] No business-logic changes for cosmetic reasons

---

## 18. Out of scope (this document)

- Page redesign / layout rebuild
- Changing HotSOS auth, classify, or API contracts
- Dark mode implementation (tokens reserved; enable later)
- Marketing site patterns

Next step when approved: implement tokens in `index.css` + add missing shadcn primitives, then redesign Dashboard surfaces without altering shared classification logic.
