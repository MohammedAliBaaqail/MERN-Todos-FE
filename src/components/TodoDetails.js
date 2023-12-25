import React from "react";
import { useState , useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Countdown from "react-countdown";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import calculateTimePercentage from "../utils/calculateTimePercentage";

export default function TodoDetails({ todo, isAdmin }) {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const [completedAt, setCompletedAt] = useState(todo.completedAt);



  const handleClick = async (e) => {
    const isButton = e.target.tagName === "BUTTON" || e.target.closest("button");
      const isInput = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

    if (!isButton && !isInput)
      try {
        const updatedCompleted = !completed;
        const updatedCompletedAt = updatedCompleted ? new Date() : null;

        const response = await fetch(
          `https://mern-todos-be.adaptable.app/todos/${isAdmin ? "admin/" : "basic/"}${todo._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              completed: updatedCompleted,
              completedAt: updatedCompletedAt,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          setCompleted(updatedCompleted);
          setCompletedAt(updatedCompletedAt);
          document.getElementById(todo._id).classList.remove ("animate__bounceIn");
          document.getElementById(todo._id).classList.add("animate__headShake");
          setTimeout(() => {
            document
              .getElementById(todo._id)
              .classList.remove("animate__headShake");
          }, 1000);

          const data = await response.json();
          dispatch({ type: "UPDATE_TODO", payload: data });
        } else {
          // Handle error response
          console.error("Failed to update completed status.");
        }
      } catch (error) {
        console.error("Error occurred while updating completed status:", error);
      }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!user || !editing) {
      return;
    }

    try {
      const updatedTodo = { title, date, description };
      const response = await fetch(
        `https://mern-todos-be.adaptable.app/todos/${isAdmin ? "admin/" : "basic/"}${todo._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedTodo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "UPDATE_TODO", payload: json });
      } else {
        // Handle error response
        console.error("Failed to update todo.");
      }
    } catch (error) {
      console.error("Error occurred while updating todo:", error);
    }

    setEditing(false);
  };

  const renderCountdown = ({ days, hours, minutes, seconds }) => {
    return (
      <div>
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    );
  };
  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    document.getElementById(todo._id).classList.remove ("animate__bounceIn");
    document.getElementById(todo._id).classList.remove("animate__headShake");
    document.getElementById(todo._id).classList.add("animate__bounceOut");

    await sleep(500);

    const response = await fetch(
      `https://mern-todos-be.adaptable.app/todos/${isAdmin ? "admin/" : "basic/"}${todo._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  console.log(calculateTimePercentage(todo.createdAt, todo.date));

  return (
    <div className="card" onClick={handleClick}>
      <div className={!editing ? "hide" : ""}></div>
     
        <div className="card-firstRow">
          <button
            className="material-symbols-outlined"
            onClick={() => setEditing(!editing)}
          >
            edit
          </button>

          <h2 className={editing ? "hide" : "todo-title"}>{todo.title}</h2>
          <input
            id="titleInput"
            value={title}
            type="text"
            className={!editing ? "hide" : "input updated-deadline"}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="material-symbols-outlined"
            onClick={handleDeleteClick}
          >
            Delete{" "}
          </button>
        </div>
        {/* {completed ? '' :  <label htmlFor="dateInput">Deadline:</label>} */}
        {/* <h3 className={editing ? "hide" : ""}>{todo.date}</h3> */}
        <div className={editing ? "hide" : "todo-des"}>
          {" "}
          <p>{todo.description}</p>{" "}
        </div>
        <textarea
          id="descriptionInput"
          value={description}
          type="textarea"
          className={!editing ? "hide" : "input"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          id="dateInput"
          value={date}
          type="datetime-local"
          className={!editing ? "hide" : "input updated-deadline"}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className={editing? '':"todo-date"}>
        {completed | editing ? (
          ""
        ) : (
         
          <div className="todo-deadline">
          <span className="material-symbols-outlined">
alarm
</span>
<div>
          <Countdown
            date={todo.date}
            renderer={renderCountdown}
            
          />
          </div>
             &nbsp;Left
          </div>
          
        )}
        {/*            
          <label htmlFor="descriptionInput">Description:</label> */}
      

      <div className={editing | !completed ? "hide" : "todo-completedAt"}>
        {" "}
        <h4>
          {completed
            ? "Completed " +
              formatDistanceToNow(new Date(completedAt), { addSuffix: true })
            : ""}{" "}
        </h4>{" "}
      </div>
    

      {/* <input className="toggle complate" type="checkbox" onChange={handleClick} checked={completed} /> */}
      <div className="todo-createdAt">
        <h4 className={editing ? "hide" : ""}>
          Created{" "}
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </h4>
      </div>
      </div>
      <div className={!editing ? "hide" : "todo-btn"}>
        <button
          id={todo._id + todo.date}
          className={!editing ? "hide" : "btn"}
          onClick={handleEdit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
