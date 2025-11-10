import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './App.css';
import './index.css';
import { useNotes } from './hooks/useNotes';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';

// PUBLIC_INTERFACE
function App() {
  /**
   * App: Notes SPA entrypoint
   * - Manages theme (light/dark)
   * - Renders the layout: Sidebar, Topbar, NoteList, NoteEditor
   * - Wires search/filter and CRUD operations via useNotes hook
   */
  const [theme, setTheme] = useState('light');
  const {
    notes,
    filteredNotes,
    selectedId,
    setSelectedId,
    search,
    setSearch,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    reload,
  } = useNotes();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // Keyboard shortcuts: Cmd/Ctrl+S to save, Delete to remove
  useEffect(() => {
    const onKey = async (e) => {
      const isSave = (e.key === 's' || e.key === 'S') && (e.metaKey || e.ctrlKey);
      if (isSave) {
        e.preventDefault();
        if (selectedNote) {
          // Trigger a save if there are staged changes in editor via custom event
          window.dispatchEvent(new Event('notes:save'));
        }
      }
      const isDelete = e.key === 'Delete';
      if (isDelete && selectedNote) {
        e.preventDefault();
        await deleteNote(selectedNote.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedNote, deleteNote]);

  return (
    <div className="app-root">
      <aside className="sidebar" aria-label="Sidebar">
        <Sidebar
          onToggleTheme={toggleTheme}
          theme={theme}
          onReload={reload}
        />
      </aside>

      <main className="main">
        <Topbar
          search={search}
          onSearch={setSearch}
          onCreate={createNote}
          theme={theme}
          onToggleTheme={toggleTheme}
          loading={loading}
        />

        {error && (
          <div role="alert" className="alert error">
            {error}
          </div>
        )}

        <div className="content">
          <section className="list-pane" aria-label="Notes list">
            <NoteList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={setSelectedId}
              loading={loading}
            />
          </section>

          <section className="editor-pane" aria-label="Editor">
            <NoteEditor
              key={selectedId || 'empty'}
              note={selectedNote}
              onChange={(updated) => updateNote(updated.id, updated)}
              onDelete={() => selectedNote && deleteNote(selectedNote.id)}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
