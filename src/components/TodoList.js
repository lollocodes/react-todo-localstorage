import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, deleteTodo, completeTodo, filteredTodos}) => {
  return (
    <div className='my-4 w-[100%]'>
        You have {todos.length} things left!
        {filteredTodos.map(todo => {
            return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
        })}
    </div>
  )
}

export default TodoList