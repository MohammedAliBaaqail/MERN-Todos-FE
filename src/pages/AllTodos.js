import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";
import TodoContainer from "../components/TodoContainer";
import useFetchTodos from "../hooks/useFetchTodos";

export const AllTodos = () => {
  const { user } = useAuthContext();
  const { todos, dispatch } = useTodosContext();
  const { fetchTodos, error, isLoading } = useFetchTodos();

  useEffect(() => {
    const handleFetchTodos = async () => {
      const url = "admin";
      const dispatchType = "SET_TODOS";

      await fetchTodos(url, dispatchType);
    };

    if (user && user.role === "admin") {
      handleFetchTodos();
    }
  }, [user, dispatch]);

  return (
    <div className="box">
      <div className="todos-box">
        {isLoading ? (
          <div className="loader"></div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          todos.map((todo) => (
            <TodoContainer todo={todo} key={todo._id} isAdmin={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllTodos;
