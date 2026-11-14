import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import Navbar from '../components/common/Navbar';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/tasks');
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (payload) => {
    await API.post('/tasks', payload);
    fetchTasks();
  };

  const handleUpdate = async (id, payload) => {
    await API.put(`/tasks/${id}`, payload);
    setEditing(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Welcome, {user?.name}</h1>
        <TaskForm
          initialData={editing}
          onSubmit={editing ? (p) => handleUpdate(editing._id, p) : handleCreate}
          onCancel={() => setEditing(null)}
        />
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
      </main>
    </>
  );
}