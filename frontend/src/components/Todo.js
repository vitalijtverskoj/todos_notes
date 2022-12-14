import React from "react";


const TodoItem = ({todo, delete_todo}) => {

    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                <button onClick={()=> delete_todo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
};


const TodoList = ({todos, delete_todo}) => {

    return (
        <table>
            <th>
                PROJECT
            </th>
            <th>
                TEXT
            </th>
            <th>
                USER
            </th>
            <th>
                Created_at
            </th>
            <th>
                Updated_at
            </th>
            <th>
            </th>
            {todos.map((todo_) => <TodoItem todo={todo_} delete_todo={delete_todo}/>)}
        </table>
    )
};


export default TodoList;