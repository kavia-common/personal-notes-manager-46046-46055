import React from 'react';

/**
 * NoteList: Renders a list of notes
 * Props:
 * - notes: Array<{id,title,content,updatedAt?}>
 * - selectedId: string|null
 * - onSelect: (id: string) => void
 * - loading: boolean
 */
export function NoteList({ notes, selectedId, onSelect, loading }) {
  if (loading && (!notes || notes.length === 0)) {
    return <div className="note-list" aria-busy="true" style={{ padding: 12 }}>Loading…</div>;
  }
  if (!notes || notes.length === 0) {
    return <div className="note-list" style={{ padding: 12, color: 'var(--color-muted)' }}>No notes yet. Create one!</div>;
  }
  return (
    <div className="note-list" role="list">
      {notes.map(n => (
        <div
          key={n.id}
          role="listitem"
          tabIndex={0}
          className={`note-item ${selectedId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelect(n.id);
          }}
        >
          <h4>{n.title || 'Untitled'}</h4>
          <p>{(n.content || '').slice(0, 80)}</p>
        </div>
      ))}
    </div>
  );
}
