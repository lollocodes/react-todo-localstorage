import React from 'react'

const Todo = ({todo, deleteTodo, completeTodo}) => {
  const handleDelete = () => {
    deleteTodo(todo)
  }

  const handleComplete = () => {
    completeTodo(todo)
  }

  return (
    <li className='my-4 flex justify-between '>
        <input type="checkbox" onChange={handleComplete}  checked={todo.completed} />
        <span >{todo.title} </span>
        <button className='text-pink-500' onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Todo