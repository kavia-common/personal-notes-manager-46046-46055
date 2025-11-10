import React from 'react';

/**
 * Topbar: Search and Add
 * Props:
 * - search: string
 * - onSearch: (v: string) => void
 * - onCreate: () => void
 * - theme: 'light' | 'dark'
 * - onToggleTheme: () => void
 * - loading: boolean
 */
export function Topbar({ search, onSearch, onCreate, theme, onToggleTheme, loading }) {
  return (
    <div className="topbar" role="banner">
      <input
        className="input"
        placeholder="Search notes by title..."
        value={search}
        aria-label="Search notes by title"
        onChange={e => onSearch(e.target.value)}
      />
      <button
        className="btn btn-amber"
        onClick={onCreate}
        disabled={loading}
        aria-label="Add note"
        title="Add note"
      >
        ✦ New Note
      </button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button
          className="btn btn-ghost"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}
