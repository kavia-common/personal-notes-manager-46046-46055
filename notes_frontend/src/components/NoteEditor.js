import React, { useEffect, useRef, useState } from 'react';

/**
 * NoteEditor: edit selected note
 * Props:
 * - note: {id, title, content} | null
 * - onChange: (note: {id, title, content}) => void
 * - onDelete: () => void
 */
export function NoteEditor({ note, onChange, onDelete }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const saveRef = useRef(onChange);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]);

  useEffect(() => {
    saveRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const onSave = () => {
      if (note) {
        saveRef.current({ id: note.id, title, content });
      }
    };
    window.addEventListener('notes:save', onSave);
    return () => window.removeEventListener('notes:save', onSave);
  }, [note, title, content]);

  if (!note) {
    return <div className="editor" style={{ padding: 14, color: 'var(--color-muted)' }}>Select a note to start editing.</div>;
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <input
          className="input editor-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <button
          className="btn btn-primary"
          onClick={() => onChange({ id: note.id, title, content })}
          aria-label="Save note"
          title="Save (Ctrl/Cmd+S)"
        >
          Save
        </button>
        <button
          className="btn btn-ghost"
          onClick={onDelete}
          aria-label="Delete note"
          title="Delete (Del)"
        >
          Delete
        </button>
      </div>
      <div className="editor-body">
        <textarea
          className="editor-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your note here…"
          aria-label="Note content"
        />
      </div>
    </div>
  );
}
