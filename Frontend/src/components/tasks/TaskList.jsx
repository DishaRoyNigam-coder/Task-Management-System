// TaskList.jsx
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) return <p>No tasks yet. Create one above!</p>;
  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskCard key={t._id} task={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}