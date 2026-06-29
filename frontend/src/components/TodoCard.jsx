function TodoCard({ todo, onDelete }) {
  return (
    <div className="card">
      <h2>{todo.title}</h2>

      <p className="status">
        Status : {todo.completed ? "✅ Completed" : "⏳ Pending"}
      </p>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoCard;