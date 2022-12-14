import React from "react";


const UserItem = ({user}) => {

    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
};


const UserList = ({users}) => {

    return (
        <table>
            <th>
                USERNAME
            </th>
            <th>
                FIRST NAME
            </th>
            <th>
                LAST NAME
            </th>
            <th>
                EMAIL
            </th>
            {users.map((user_) => <UserItem user={user_} />)}
        </table>
    )
};


export default UserList;