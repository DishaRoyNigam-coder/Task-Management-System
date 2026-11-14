// TaskCard.jsx
export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className={`task-card status-${task.status.replace(' ', '-')}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <span className="badge">{task.status}</span>
      <small>{new Date(task.createdAt).toLocaleDateString()}</small>
      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}