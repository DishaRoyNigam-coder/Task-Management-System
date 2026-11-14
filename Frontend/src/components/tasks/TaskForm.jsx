import { useState, useEffect } from 'react';

export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.title.trim().length < 3)
      return setError('Title must be at least 3 characters');
    await onSubmit(form);
    setForm({ title: '', description: '', status: 'Pending' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Task' : 'Add New Task'}</h3>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <div>
        <button type="submit">{initialData ? 'Update' : 'Create'}</button>
        {initialData && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}