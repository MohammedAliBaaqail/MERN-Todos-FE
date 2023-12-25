import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const useFetchTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useTodosContext();

  const fetchTodos = async (url, dispatchType) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://mern-todos-be.adaptable.app/todos/${url}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: dispatchType, payload: json });
      } else {
        throw new Error("Failed to fetch todos");
      }
    } catch (error) {
      setError(error); 
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false); 
    }
  };



  return { fetchTodos, isLoading, error }; 
};

export default useFetchTodos;
