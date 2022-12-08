import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([])
  const todoNameRef = useRef();

  //Run once when the app starts
  useEffect(() => {
    if(!localStorage.getItem("todos") || JSON.parse(localStorage.getItem("todos")).length === 0){
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let storedTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    filterAll()
  }, [todos])

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuidv4(),
        title: name,
        completed: false
      }]
    })
    todoNameRef.current.value = null;
  }

  const deleteTodo = (todo) => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  }

  const completeTodo = (todo) => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item;
    }))
  }

  const filterCompleted = () => {
    setFilteredTodos(todos.filter(todo => todo.completed === true))
    console.log(filteredTodos)
  }

  const filterAll = () => {
    setFilteredTodos(todos)
  }

  return (
    <div className="App flex flex-col justify-center items-center	m-8 bg-neutral-100 max-w-md mx-auto rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="inputFields">
            <input ref={todoNameRef} className="px-4 py-3 mx-3 rounded-xl border" type="text" id="addTodo" placeholder="Add task" />
            <button className="bg-blue-700 text-white rounded-xl px-4 py-3" onClick={handleAddTodo}>+</button>
          </div>
          <TodoList 
            todos={todos} 
            deleteTodo={deleteTodo} 
            completeTodo={completeTodo} 
            filteredTodos={filteredTodos}
          />
      </div>
      <ul className="flex justify-around w-[100%] bg-slate-600 p-4 text-white">
        <li onClick={filterAll}>All</li>
        <li onClick={filterCompleted}>Completed</li>
      </ul>
    </div>
  );
}

export default App;
