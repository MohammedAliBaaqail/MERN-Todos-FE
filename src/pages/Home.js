import { useEffect, useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import  useFetchTodos  from "../hooks/useFetchTodos";

import TodoContainer from "../components/TodoContainer";
import TodoForm from "../components/TodoForm";


// components

const Home = () => {
  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const { fetchTodos, error, isLoading } = useFetchTodos();

  const [filterdTodos, setFilterdTodos] = useState([]); // Initialize as empty array


  useEffect(() => {
    setFilterdTodos(todos || []); // Ensure todos is not null when setting filterdTodos
  }, [todos]);

  const hanndleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = (todos || []).filter((todo) => {
      // Ensure todos is not null during filtering
      return (
        todo.title.toLowerCase().includes(search) ||
        todo.date.toLowerCase().includes(search) ||
        todo.description.toLowerCase().includes(search)
      );
    });
    setFilterdTodos(filtered);
  };

  useEffect(() => {
    const handlefetchTodos = async () => {
      const url = "basic";
      const dispatchType = "SET_TODOS";

     
        await fetchTodos(url, dispatchType);
     
  
    };
    if (user) {
      handlefetchTodos();
    }
  }, [dispatch, user]);



  return (
    <div className="home">
      <TodoForm todos={todos} />
      <div className="todos-container">
        <div className="box">
          <div className="search-container">
            <h3 className="highlight">Search Todos</h3>
            <input
              className="search-todos"
              type="text"
              placeholder="Search"
              onChange={hanndleSearch}
            />
          </div>
          {isLoading ? (
            <div className="loader"></div>
          )  : error ? (
            <div>Error: {error.message}</div>
          ): !filterdTodos || filterdTodos.length === 0 ? ( // Check for null or empty array
            <h1 className="loading">No Todos Found!</h1>
          ) : (
            <div className="todos-box">
              {filterdTodos.map((todo) => (
                <TodoContainer
                  todo={todo}
                  key={todo._id}
                  hanndleSearch={hanndleSearch}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
