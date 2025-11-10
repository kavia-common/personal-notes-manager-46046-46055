import React from 'react';

/**
 * Sidebar: branding, actions
 * Props:
 * - onToggleTheme: () => void
 * - theme: 'light' | 'dark'
 * - onReload: () => void
 */
export function Sidebar({ onToggleTheme, theme, onReload }) {
  return (
    <div>
      <div className="brand" aria-label="App brand">
        <span className="dot" aria-hidden="true" />
        <div>Ocean Notes</div>
      </div>
      <div className="muted">Personal notes with a modern retro vibe</div>

      <div className="actions" role="group" aria-label="Sidebar actions">
        <button
          className="btn btn-ghost"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
        </button>
        <button className="btn btn-ghost" onClick={onReload} aria-label="Reload notes">
          ⟳ Reload
        </button>
      </div>
    </div>
  );
}
