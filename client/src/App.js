import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();

      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTodo() {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          deadline: deadline,
        }),
      });

      const data = await response.json();

      setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        return;
      }
      throw new Error("Failed to delete todo");
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTodo(id) {
    try {
      const todo = todos.find((todo) => todo.id === id);
      todo.description = description;
      todo.deadline = deadline;

      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (response.status === 200) {
        setTodos((prev) => [...prev.filter((todo) => todo.id !== id), todo]);
        return;
      }
      throw new Error("Failed to update todo");
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.description}</h3>
            <p>created: {todo.createdAt.slice(0, 10)}</p>
            <p>deadline: {todo.deadline.slice(0, 10)}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id)}>Update</button>
          </li>
        ))}
      </ul>
      <input type='text' onChange={(e) => setDescription(e.target.value)} />
      <input type='date' onChange={(e) => setDeadline(e.target.value)} />
      <button onClick={createTodo}>Create Todo</button>
    </div>
  );
}

export default App;
