import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";


import formatDistanceToNow from "date-fns/formatDistanceToNow";


import TodoDetails from "./TodoDetails";

const TodoContainer = ({ todo ,hanndleSearch, isAdmin }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();



 

  const handleDeleteClick = async () => {

    if (!user) {
      return;
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    document.getElementById(todo._id).classList.add("animate__bounceOut");

    await sleep(500);

    const response = await fetch(`https://mern-todos-be.adaptable.app/todos/${isAdmin?'admin/':'basic/'}${todo._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
      
    }
  };

  return (
    <div
      id={todo._id}
      className="todo-details animate__animated animate__bounceIn "
    >

      

      <TodoDetails todo={todo} isAdmin={isAdmin}  />
        

   

        {/* <h3>
          Created{" "}
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </h3>
        <button className="material-symbols-outlined" onClick={handleDeleteClick}>
          Delete{" "}
        </button> */}

    </div>
  );
};

export default TodoContainer;
