import {ReactNode, createContext, useContext, useState} from 'react'

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date
}

export type TodosContext = {
    todos: Todo[];
    handleAddToDo:(task:string) => void;
    toggelTodoAsCompleted: (id:string) => void
    handleTodoDelete: (id:string) => void
}

export const todoContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}:TodosProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const handleAddToDo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt: new Date()
                },
                ...prev
            ];
            return newTodos;
        })
    }

    const toggelTodoAsCompleted = (id:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = prev.map((todo) => {
                if(todo.id == id){
                    return{ ... todo, completed: !todo.completed }
                }
                return todo;
            });
            return newTodos;
        })
        
    }

    const handleTodoDelete = (id:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = prev.filter((todo) => todo.id !== id);
            return newTodos;
        })
    }

    return <todoContext.Provider value={{todos, handleAddToDo, toggelTodoAsCompleted, handleTodoDelete}}>
        {children}
    </todoContext.Provider>
}


export const useTodos = () => {
    const todosConsumer = useContext(todoContext);
    return todosConsumer
}