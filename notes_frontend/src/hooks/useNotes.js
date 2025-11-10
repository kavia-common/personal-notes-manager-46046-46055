/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

/**
 * Note shape expected from backend:
 * { id: string, title: string, content: string, updatedAt?: string }
 */

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * Hook encapsulating CRUD, local state, search filtering, and selection.
   * Provides optimistic updates for create and delete.
   */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const list = await api.list();
      setNotes(list || []);
      if (!selectedId && list && list.length > 0) {
        setSelectedId(list[0].id);
      }
    } catch (e) {
      setError(e.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, []);

  // PUBLIC_INTERFACE
  const reload = useCallback(() => load(), [load]);

  // PUBLIC_INTERFACE
  const createNote = useCallback(async () => {
    const draft = {
      title: 'Untitled',
      content: '',
    };
    // optimistic: create placeholder with temp id
    const tempId = `temp-${Date.now()}`;
    const optimistic = { id: tempId, ...draft };
    setNotes(prev => [optimistic, ...prev]);
    setSelectedId(tempId);

    try {
      const created = await api.create(draft);
      setNotes(prev => prev.map(n => (n.id === tempId ? created : n)));
      setSelectedId(created.id);
    } catch (e) {
      setNotes(prev => prev.filter(n => n.id !== tempId));
      setError(e.message || 'Failed to create note');
    }
  }, []);

  // PUBLIC_INTERFACE
  const updateNote = useCallback(async (id, patch) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch } : n))
    );
    try {
      const current = notes.find(n => n.id === id);
      const payload = {
        title: patch.title ?? current?.title ?? '',
        content: patch.content ?? current?.content ?? '',
      };
      const updated = await api.update(id, payload);
      setNotes(prev => prev.map(n => (n.id === id ? updated : n)));
    } catch (e) {
      setError(e.message || 'Failed to update note');
      // Consider reload on hard fail
    }
  }, [notes]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(async (id) => {
    const prev = notes;
    setNotes(prev.filter(n => n.id !== id));
    if (selectedId === id) setSelectedId(null);
    try {
      await api.remove(id);
    } catch (e) {
      setNotes(prev); // revert
      setError(e.message || 'Failed to delete note');
    }
  }, [notes, selectedId]);

  const filteredNotes = useMemo(() => {
    if (!search) return notes;
    const q = search.toLowerCase();
    return notes.filter(n => (n.title || '').toLowerCase().includes(q));
  }, [notes, search]);

  return {
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
  };
}
