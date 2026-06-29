import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import TodoCard from "../components/TodoCard";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("/");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await API.post("/", {
      title: title,
    });

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>Todo Application</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoCard
            todo={todo}
            onDelete={deleteTodo}
          />

          <Link to={`/todo?id=${todo.id}`}>
            View Details
          </Link>

          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default TodoList;