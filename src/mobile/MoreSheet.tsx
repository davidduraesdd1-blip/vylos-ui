// polaris-ui/src/mobile/MoreSheet.tsx
// Full-screen "More" sheet — Phase 1 of the Claude Design mobile handoff.
// One search field filters EVERY destination in the app, including
// desktop-only ones, which are listed and marked rather than hidden.
// Full screen, not a half sheet. Escape and the Done button both close.

import * as React from 'react';

export interface MoreEntry {
  id: string;
  label: string;
  /** Group heading, e.g. "Recents" | "Research" | "Account". */
  group: string;
  /** Right-aligned detail: source app, current value, etc. */
  detail?: string;
  /** Desktop-only destinations are shown with an outbound marker, not hidden. */
  desktopOnly?: boolean;
  href?: string;
}

export interface MoreSheetProps {
  open: boolean;
  onClose: () => void;
  entries: MoreEntry[];
  onSelect?: (id: string) => void;
  searchPlaceholder?: string;
}

/** Case-insensitive substring match; highlights the match in accent. */
function highlight(label: string, q: string): React.ReactNode {
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return label;
  return (
    <>
      {label.slice(0, i)}
      <b style={{ color: 'var(--accent)', fontWeight: 600 }}>{label.slice(i, i + q.length)}</b>
      {label.slice(i + q.length)}
    </>
  );
}

export function MoreSheet({
  open,
  onClose,
  entries,
  onSelect,
  searchPlaceholder,
}: MoreSheetProps) {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim();
  const visible = q
    ? entries.filter((e) => e.label.toLowerCase().includes(q.toLowerCase()))
    : entries;
  const groups: string[] = [];
  for (const e of visible) if (!groups.includes(e.group)) groups.push(e.group);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="More"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'var(--bg-0)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px var(--m-gutter) 10px',
        }}
      >
        <span style={{ font: '600 15px/1 var(--font-ui)', color: 'var(--text-primary)' }}>More</span>
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            font: '500 13px/1 var(--font-ui)',
            color: 'var(--accent)',
            padding: '8px 0 8px 16px',
          }}
        >
          Done
        </button>
      </div>
      <div style={{ padding: '0 var(--m-gutter) 8px' }}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder ?? `Search ${entries.length} entries`}
          aria-label="Search destinations"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '10px 12px',
            font: '400 13.5px/1.2 var(--font-ui)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        {q && (
          <div style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 6 }}>
            {visible.length} of {entries.length}
          </div>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--m-gutter) 24px' }}>
        {groups.map((g) => (
          <div key={g}>
            <div
              style={{
                font: '500 10px/1 var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: '16px 0 4px',
              }}
            >
              {g}
            </div>
            {visible
              .filter((e) => e.group === g)
              .map((e) => {
                const Tag: 'a' | 'button' = e.href ? 'a' : 'button';
                return (
                  <Tag
                    key={e.id}
                    href={e.href}
                    onClick={(ev: React.MouseEvent) => {
                      if (onSelect) {
                        if (!e.href) ev.preventDefault();
                        onSelect(e.id);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      boxSizing: 'border-box',
                      minHeight: 44,
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      textAlign: 'left',
                      padding: '10px 0',
                      font: '400 13.5px/1.3 var(--font-ui)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span style={{ minWidth: 0 }}>{highlight(e.label, q)}</span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        font: '400 11px/1 var(--font-mono)',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {e.detail}
                      {e.desktopOnly && <span aria-label="opens on desktop"> · desktop ↗</span>}
                    </span>
                  </Tag>
                );
              })}
          </div>
        ))}
        {q && visible.length === 0 && (
          <div style={{ font: '400 12.5px/1.5 var(--font-ui)', color: 'var(--text-muted)', marginTop: 24 }}>
            Nothing matches "{q}". Clear the field for all {entries.length} entries.
          </div>
        )}
        {!q && (
          <div style={{ font: '400 11.5px/1.5 var(--font-ui)', color: 'var(--text-muted)', marginTop: 20 }}>
            Keep typing to narrow, or clear the field for all {entries.length} entries.
          </div>
        )}
      </div>
    </div>
  );
}

export default MoreSheet;
