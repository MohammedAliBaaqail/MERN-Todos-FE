import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TodoForm = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const todo = { title, date, description, username: user.username };

    const response = await fetch("/todos/basic", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setDate("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "ADD_TODO", payload: json });
    }
  };
  const errorMsg = emptyFields.map((e) => <span> {e + " -"} </span>);

  return (
    <div className="todo-form-container">
      <h3 className="highlight">Add a New Todo</h3>
      <form className="todo-form" onSubmit={handleSubmit}>
        <h2>Title</h2>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <h2>Deadline</h2>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className={emptyFields.includes("date") ? "error" : ""}
        />

        <h2 className="todo-form-des ">Description</h2>
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={emptyFields.includes("description") ? "error" : ""}
        />

        <div className="todo-form-button">
          {" "}
          <button>Add Todo</button>
        </div>

        {error && (
          <div className="error-msg">
            {error}:{errorMsg}{" "}
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
