import React from "react";


const TodoItem = ({todo}) => {

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
        </tr>
    )
};


const TodoList = ({todos}) => {

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
            {todos.map((todo_) => <TodoItem todo={todo_} />)}
        </table>
    )
};


export default TodoList;