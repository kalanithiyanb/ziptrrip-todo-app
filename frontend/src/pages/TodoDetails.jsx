import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../services/api";

function TodoDetails() {
  const [searchParams] = useSearchParams();
  const [todo, setTodo] = useState(null);

  const id = searchParams.get("id");

  useEffect(() => {
    API.get(`/${id}`).then((res) => {
      setTodo(res.data);
    });
  }, [id]);

  if (!todo) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Todo Details</h1>

        <h2>{todo.title}</h2>

        <p className="status">
          Status : {todo.completed ? "✅ Completed" : "⏳ Pending"}
        </p>

        <Link to="/">⬅ Back to Todo List</Link>
      </div>
    </div>
  );
}

export default TodoDetails;