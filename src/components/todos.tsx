import React from 'react'
import { useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

const Todos = () => {
    const {todos, toggelTodoAsCompleted, handleTodoDelete} = useTodos();

    const [searchParams] = useSearchParams();

    let todosData = searchParams.get("todos");

    let filterData = todos;

    if(todosData == "active"){
        filterData = filterData.filter((task) => !task.completed )
    }

    if(todosData == "completed"){
        filterData = filterData.filter((task) => task.completed )
    }

    
  return (
    <ul>
        {
            filterData.map((todo) => {
                return(
                    <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggelTodoAsCompleted(todo.id)}/>
                        <label htmlFor={`todo-${todo.id}`}> {todo.task} </label>

                        {
                            todo.completed && (
                                <button type="button" 
                                onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                            )
                        }
                    </li>
                )
            })
        }
    </ul>
  )
}

export default Todos
